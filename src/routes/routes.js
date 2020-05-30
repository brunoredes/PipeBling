import { Router } from 'express';
import OpportunityController from '../controllers/OpportunityController';
import OrderController from '../controllers/OrderController';

const routes = new Router();

routes.get('/', (request, response) => {
  response.json({
    message: 'API de Integração do sistema Pipedrive com o CRM Bling',
  });
});

routes.get('/opportunities', OpportunityController.index);
routes.post('/opportunities', OrderController.store);

export default routes;
