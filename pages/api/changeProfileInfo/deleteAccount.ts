import { NextApiRequest, NextApiResponse } from 'next';
import { deleteUserById } from '../../../util/database';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const { id } = request.body;

  const deleteUser = await deleteUserById(id);

  if (typeof deleteUser === 'undefined') {
    // TODO: Return proper message from the server
    return response.status(401).send({ success: false });
  }

  response.send({ success: true });
}
