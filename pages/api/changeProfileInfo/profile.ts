import { NextApiRequest, NextApiResponse } from 'next';
import {
  alterNameOfUserById,
  alterUserEmailById,
  alterUsernameById,
} from '../../../util/database';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const { id, firstName, lastName, userName, userEmail } = request.body;

  const changeEmail = await alterUserEmailById(id, userEmail);
  const changeUserName = await alterUsernameById(id, userName);
  const changeNameOfUser = await alterNameOfUserById(id, firstName, lastName);

  if (typeof changeEmail === 'undefined') {
    // TODO: Return proper message from the server
    return response.status(401).send({ success: false });
  }
  if (typeof changeUserName === 'undefined') {
    // TODO: Return proper message from the server
    return response.status(401).send({ success: false });
  }

  if (typeof changeNameOfUser === 'undefined') {
    // TODO: Return proper message from the server
    return response.status(401).send({ success: false });
  }

  response.send({ success: true });
}
