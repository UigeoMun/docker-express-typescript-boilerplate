import { RequestHandler } from 'express';
import { deleteRole } from '../../models/Roles';

const remove : RequestHandler<{id : string}> = async (req, res) => {
  const id = Number(req.params.id);
  try {
    const result = await deleteRole(id);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json('FAIL to delete role');
  }
};

export default remove;
