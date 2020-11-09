import { NextApiRequest, NextApiResponse } from 'next';
import {
  insertVocabList,
  insertWordsToVocabList,
  getVocabListsById,
} from '/Users/jamessheppard/Desktop/Coding/dictionary-app/util/database';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const { newListName, id, term } = request.body;
  const user = await insertVocabList(newListName, id);
  const addWordsToList = await insertWordsToVocabList(term, id);

  if (typeof user === 'undefined') {
    // TODO: Return proper message from the server
    return response.status(401).send({ success: false });
  }

  if (typeof addWordsToList === 'undefined') {
    // TODO: Return proper message from the server
    return response.status(401).send({ success: false });
  }

  response.send({ success: true });
}
