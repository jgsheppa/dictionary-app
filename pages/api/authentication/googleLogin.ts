import crypto from 'crypto';
import { NextApiRequest, NextApiResponse } from 'next';
import argon2 from 'argon2';
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

  const googleIdAlreadyTaken =
    typeof (await getUserByGoogleId(userProfileInfo.googleId)) !== 'undefined';

  console.log('googleId already taken?', googleIdAlreadyTaken);

  if (googleIdAlreadyTaken) {
    const googleUser = await getUserByGoogleId(userProfileInfo.googleId);
    console.log(googleUser);
    await insertSession(googleToken, googleUser.id);
  }

  if (!googleIdAlreadyTaken) {
    console.log(userProfileInfo);
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
