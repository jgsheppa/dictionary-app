import { NextApiRequest, NextApiResponse } from 'next';
import {
  insertVocabList,
  getVocabListsById,
  deleteWordsFromList,
} from '../../../util/database';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  console.log('request', request.body);

  if (request.method === 'POST') {
    const { newListName, id } = request.body;
    console.log('id', id);
    const user = await insertVocabList(newListName, id);
    const vocabListId = await getVocabListsById(id);

    if (typeof user === 'undefined') {
      // TODO: Return proper message from the server
      return response.status(401).send({ success: false });
    }
  }
  // else if (request.method === 'PUT') {
  //   const { wordListId, term } = request.body;

  //   const vocabListId = await getVocabListsById(wordListId);
  //   const addWordsToList = await insertWordsToVocabList(
  //     term,
  //     vocabListId[0].id,
  //   );

  //   if (typeof addWordsToList === 'undefined') {
  //     // TODO: Return proper message from the server
  //     return response.status(401).send({ success: false });
  //   }
  // }
  else if (request.method === 'DELETE') {
    const { wordListId, term } = request.body;
    console.log('wordListId', wordListId);
    // const vocabListId = await getVocabListsById(wordListId);
    // console.log('vocabListId', vocabListId);
    const deleteWord = await deleteWordsFromList(term, wordListId);
  }

  response.send({ success: true });
}
