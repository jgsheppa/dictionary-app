import { NextApiRequest, NextApiResponse } from 'next';
import { getSessionByToken } from '../../../util/database';
import { isSessionTokenValid } from '../../../util/auth';
import {
  insertWordsToVocabList,
  deleteWordsFromList,
  getVocabLists,
  getWordsArray,
} from '../../../util/database';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  if (request.method === 'POST') {
    const { wordListId, term } = request.body;
    const addWordsToList = await insertWordsToVocabList(term, wordListId);

    if (typeof addWordsToList === 'undefined') {
      // TODO: Return proper message from the server
      return response.status(401).send({ success: false });
    }
  } else if (request.method === 'DELETE') {
    const { wordListId, term } = request.body;
    const deleteWord = await deleteWordsFromList(term, wordListId);
  }

  response.send({ success: true });
}
