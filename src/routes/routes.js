import { Router } from 'express';
import OpportunityController from '../controllers/OpportunityController';

const routes = new Router();

routes.get('/teste', (request, response) => {
  response.json({ message: 'rolou' });
});

routes.get('/opportunities', OpportunityController.index);
routes.post('/opportunities', OpportunityController.store);

export default routes;
