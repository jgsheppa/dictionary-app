import { NextApiRequest, NextApiResponse } from 'next';
import {
  deleteListById,
  deleteWordsFromList,
} from '/Users/jamessheppard/Desktop/Coding/dictionary-app/util/database';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const { id } = request.body;

  const deleteWordFromList = await deleteWordsFromList(id);

  if (typeof deleteWordFromList === 'undefined') {
    // TODO: Return proper message from the server
    return response.status(401).send({ success: false });
  }

  // if (typeof deleteWord === 'undefined') {
  //   // TODO: Return proper message from the server
  //   return response.status(401).send({ success: false });
  // }

  response.send({ success: true });
}
