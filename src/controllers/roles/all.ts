import { RequestHandler } from 'express';
import { getRoles } from '../../models/Roles';
import handleErrorMiddleware from '../../middleware/handle-error-middleware';


const all: RequestHandler = async (_req, res) => {
  try {
    console.log("ALL")
    const result = await getRoles();
    res.status(200).json({ roles: result.rows });
  } catch (err) {
    res.status(500).json({ message: 'Failure to get all roles' });
  }
};

export default handleErrorMiddleware(all);
