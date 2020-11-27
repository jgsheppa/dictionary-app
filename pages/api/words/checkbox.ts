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
    const { wordListId, term, foreignTerm } = request.body;
    console.log(request.body);
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
    const deleteWord = await deleteWordsFromList(term, foreignTerm, wordListId);
  }

  response.send({ success: true });
}
