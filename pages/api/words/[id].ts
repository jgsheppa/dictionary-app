import { NextApiRequest, NextApiResponse } from 'next';
import {
  insertVocabList,
  getVocabListsById,
  deleteWordsFromList,
} from '../../../util/database';
import { isSessionTokenValid } from '../../../util/auth';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const token = request.cookies.session;
  const validToken = await isSessionTokenValid(token);

  if (request.method === 'POST') {
    const { newListName, id } = request.body;
    console.log('id', id);
    const user = await insertVocabList(newListName, id);
    const vocabListId = await getVocabListsById(id);

    if (typeof user === 'undefined') {
      // TODO: Return proper message from the server
      return response.status(401).send({ success: false });
    }
  } else if (request.method === 'DELETE') {
    const { wordListId, term } = request.body;
    console.log('wordListId', wordListId);
    // const vocabListId = await getVocabListsById(wordListId);
    // console.log('vocabListId', vocabListId);
    const deleteWord = await deleteWordsFromList(term, wordListId);
  }

  if (validToken) {
    return response.send({ success: true });
  } else {
    return response.status(401).send({ success: false });
  }
}
