import { NextApiRequest, NextApiResponse } from 'next';
import { getVocabLists } from '../../../util/database';
import { getSessionByToken, getWordsArray } from '../../../util/database';
import { isSessionTokenValid } from '../../../util/auth';
import { searchTerm } from '../../../util/cookie';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const token = request.cookies.session;
  const session = await getSessionByToken(token);

  const vocabLists = await getVocabLists(session.userId);

  const currentSearchTerm = request.cookies.searchTerm;
  const wordArray = await getWordsArray(currentSearchTerm);

  if (typeof vocabLists === 'undefined') {
    // TODO: Return proper message from the server
    return response.status(401).send({ success: false });
  }

  return response.status(200).json({ vocabLists: vocabLists, wordArray });
}
