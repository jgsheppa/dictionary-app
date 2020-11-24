import { NextApiRequest, NextApiResponse } from 'next';
import { getVocabLists } from '../../../util/database';
import { getSessionByToken } from '../../../util/database';
import { isSessionTokenValid } from '../../../util/auth';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const token = request.cookies.session;
  const session = await getSessionByToken(token);

  const vocabLists = await getVocabLists(session.userId);
  console.log('vocabLists', vocabLists);

  if (typeof vocabLists === 'undefined') {
    // TODO: Return proper message from the server
    return response.status(401).send({ success: false });
  }

  console.log('hello');

  return response.status(200).json({ vocabLists: vocabLists });
  // response.send({ vocabLists });
}
