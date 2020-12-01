import { NextApiRequest, NextApiResponse } from 'next';
import { isSessionTokenValid } from '../../../util/auth';
import {
  insertWordsToVocabList,
  deleteWordsFromList,
} from '../../../util/database';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const token = request.cookies.session;
  const validToken = await isSessionTokenValid(token);

  if (!validToken) {
    return response.status(401).send({ success: false });
  }

  if (request.method === 'POST') {
    const { wordListId, term, foreignTerm } = request.body;
    const addWordsToList = await insertWordsToVocabList(
      term,
      foreignTerm,
      wordListId,
    );

    if (typeof addWordsToList === 'undefined') {
      // TODO: Return proper message from the server
      return response.status(401).send({ success: false });
    }
  } else if (request.method === 'DELETE') {
    const { wordListId, term, foreignTerm } = request.body;
    const deleteWord = await deleteWordsFromList(term, wordListId);
  }

  response.send({ success: true });
}
