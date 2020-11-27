import { NextApiRequest, NextApiResponse } from 'next';
import { deleteWordsFromList } from '../../../util/database';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const { id, lang1, foreignTerm } = request.body;

  const deleteWordFromList = await deleteWordsFromList(lang1, foreignTerm, id);
  console.log('delete word from list', deleteWordFromList);

  if (typeof deleteWordFromList === 'undefined') {
    // TODO: Return proper message from the server
    return response.status(401).send({ success: false });
  }

  response.send({ success: true });
}
