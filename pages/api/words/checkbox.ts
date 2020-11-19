import { NextApiRequest, NextApiResponse } from 'next';
import {
  insertVocabList,
  insertWordsToVocabList,
  getVocabListsById,
  deleteWordsFromList,
} from '../../../util/database';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  console.log('request', request.body);

  if (request.method === 'POST') {
    const { wordListId, term } = request.body;
    console.log('id', wordListId);
    // const vocabListId = await getVocabListsById(id);
    const addWordsToList = await insertWordsToVocabList(term, wordListId);
    console.log('term', term);
    console.log('add word to list', addWordsToList);

    if (typeof addWordsToList === 'undefined') {
      // TODO: Return proper message from the server
      return response.status(401).send({ success: false });
    }
  } else if (request.method === 'DELETE') {
    const { wordListId, term } = request.body;
    // const vocabListId = await getVocabListsById(id);
    const deleteWord = await deleteWordsFromList(wordListId);
    console.log('delete word', deleteWord);
  }

  response.send({ success: true });
}
