import { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';
import {
  deleteExpiredSessions,
  getUserByGoogleId,
  insertSession,
  registerGoogleUser,
} from '../../../util/database';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const { userProfileInfo, googleToken } = request.body;

  // Retrieve Google Endpoint to verify user credentials
  const verifiedAccessToken = `https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${googleToken}`;

  const res = await fetch(verifiedAccessToken);
  const data = await res.json();

  const clientIdEnv = process.env.OAuthGoogleClientID.split('.');
  const clientIdEndpoint = data.aud.split('.');
  const emailVerified = data.email_verified;
  const tokenExpirationDate = data.expires_in;

  if (
    emailVerified === false ||
    tokenExpirationDate === 0 ||
    clientIdEndpoint[0] !== clientIdEnv[0]
  ) {
    return response.status(401).send({ success: false });
  }

  const googleIdAlreadyTaken =
    typeof (await getUserByGoogleId(userProfileInfo.googleId)) !== 'undefined';

  if (googleIdAlreadyTaken) {
    const googleUser = await getUserByGoogleId(userProfileInfo.googleId);
    await insertSession(googleToken, googleUser.id);
  }

  if (!googleIdAlreadyTaken) {
    await registerGoogleUser(userProfileInfo);
  }

  const maxAge = 60 * 60 * 24; // 24 hours

  const isProduction = process.env.NODE_ENV === 'production';

  const sessionCookie = cookie.serialize('session', googleToken, {
    // maxAge: maxAge,
    maxAge,

    expires: new Date(Date.now() + maxAge * 1000),
    // Important for security
    // Deny cookie access from frontend JavaScript
    httpOnly: true,
    // Important for security
    // Set secure cookies on production
    secure: isProduction,

    path: '/',

    // https://web.dev/samesite-cookies-explained/
    sameSite: 'lax',
  });

  response.setHeader('Set-Cookie', sessionCookie);

  response.send({ success: true });

  await deleteExpiredSessions();
}
