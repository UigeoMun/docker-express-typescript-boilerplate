import { RequestHandler } from 'express';
import { updateRole } from '../../models/Roles';

const update : RequestHandler<{id : string}> = async (req, res) => {
  const id = Number(req.params.id);
  const { name } = req.body;

  try {
    const result = await updateRole(id, { name });
    return result;
  } catch (err) {
    throw new Error('Failure to update role');
  }
};

export default update;
