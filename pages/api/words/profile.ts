import { NextApiRequest, NextApiResponse } from 'next';
import { deleteListById, deleteWordsFromList } from '../../../util/database';
import { isSessionTokenValid } from '../../../util/auth';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const token = request.cookies.session;
  const validToken = await isSessionTokenValid(token);

  if (!validToken) {
    return response.status(401).send({ success: false });
  }

  const { id } = request.body;

  // const deleteWord = await deleteWordsFromList(id);
  const deleteList = await deleteListById(id);

  if (typeof deleteList === 'undefined') {
    // TODO: Return proper message from the server
    return response.status(401).send({ success: false });
  }

  response.send({ success: true });
}
