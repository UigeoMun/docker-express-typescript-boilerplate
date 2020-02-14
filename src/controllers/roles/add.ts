import { RequestHandler } from 'express';
import { createRole } from '../../models/Roles';

const add: RequestHandler = async (req, res) => {
  const { name } = req.body;
  try {
    const result = await createRole(name);
    res.status(200).json({ roles: result.rows });
  } catch (err) {
    res.status(500).json({ message: 'Failure to add new role' });
  }
};

export default add;
