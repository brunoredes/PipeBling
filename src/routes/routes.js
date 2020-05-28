import { Router } from 'express';

const routes = new Router();

routes.get('/teste', (request, response) => {
  response.json({ message: 'rolou' });
});

export default routes;
