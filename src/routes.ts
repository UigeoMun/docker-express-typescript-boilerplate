import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import apiSpec from '../openapi.json';

import * as BookController from './controllers/book';
import * as RoleController from './controllers/roles';

const swaggerUiOptions = {
  customCss: '.swagger-ui .topbar { display: none }'
};

const router = Router();

// Book routes
router.post('/book/add', BookController.add);
router.get('/book/all', BookController.all);
router.get('/book/search', BookController.search);

// roles
router.get('api/roles', RoleController.all);
router.post('api/roles', RoleController.add);
router.patch('api/roles/:id', RoleController.update);
router.delete('api/roles/:id', RoleController.remove);


// Dev routes
if (process.env.NODE_ENV === 'development') {
  router.use('/dev/api-docs', swaggerUi.serve);
  router.get('/dev/api-docs', swaggerUi.setup(apiSpec, swaggerUiOptions));
}

export default router;
