import { NextApiRequest, NextApiResponse } from 'next';
import { deleteListById, deleteWordsFromList } from '../../../util/database';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const { id } = request.body;

  // const deleteWord = await deleteWordsFromList(id);
  const deleteList = await deleteListById(id);

  if (typeof deleteList === 'undefined') {
    // TODO: Return proper message from the server
    return response.status(401).send({ success: false });
  }

  // if (typeof deleteWord === 'undefined') {
  //   // TODO: Return proper message from the server
  //   return response.status(401).send({ success: false });
  // }

  response.send({ success: true });
}
