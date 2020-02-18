import { RequestHandler } from 'express';
import { updateRole } from '../../models/Roles';

const update : RequestHandler<{id : string}> = async (req, res) => {
  const id = Number(req.param('id'));
  const { name } = req.body;
  console.log(id, name);

  try {
    const result = await updateRole(id, { name });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json('Failure to update role-info');
  }
};

export default update;
