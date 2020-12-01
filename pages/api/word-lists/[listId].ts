import { NextApiRequest, NextApiResponse } from 'next';
import { getSessionByToken, deleteWordsFromList } from '../../../util/database';
import { isSessionTokenValid } from '../../../util/auth';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const { id, lang1, foreignTerm } = request.body;

  const token = request.cookies.session;
  const validToken = await isSessionTokenValid(token);

  if (!validToken) {
    return response.status(401).send({ success: false });
  }

  const deleteWordFromList = await deleteWordsFromList(lang1, id);

  if (typeof deleteWordFromList === 'undefined') {
    // TODO: Return proper message from the server
    return response.status(401).send({ success: false });
  }

  response.send({ success: true });
}
