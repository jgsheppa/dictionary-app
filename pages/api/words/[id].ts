import { NextApiRequest, NextApiResponse } from 'next';
import {
  insertVocabList,
  insertWordsToVocabList,
  getVocabListsById,
  deleteWordsFromList,
} from '/Users/jamessheppard/Desktop/Coding/dictionary-app/util/database';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  console.log('request', request.body);

  if (request.method === 'POST') {
    const { newListName, id } = request.body;
    const user = await insertVocabList(newListName, id);
    const vocabListId = await getVocabListsById(id);

    if (typeof user === 'undefined') {
      // TODO: Return proper message from the server
      return response.status(401).send({ success: false });
    }
  } else if (request.method === 'PUT') {
    const { id, term } = request.body;
    const vocabListId = await getVocabListsById(id);
    const addWordsToList = await insertWordsToVocabList(
      term,
      vocabListId[0].id,
    );

    if (typeof addWordsToList === 'undefined') {
      // TODO: Return proper message from the server
      return response.status(401).send({ success: false });
    }
  } else if (request.method === 'DELETE') {
    const { id, term } = request.body;
    const vocabListId = await getVocabListsById(id);
    const deleteWord = await deleteWordsFromList(vocabListId);
  }

  response.send({ success: true });
}
