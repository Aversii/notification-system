import { FastifyInstance } from 'fastify';
import { ClientController } from '../controllers/ClientsController';

export async function clientRoutes(app: FastifyInstance) {
  const controller = new ClientController();

  app.post('/', controller.create);
  app.put('/:id', controller.update);
  app.get('/:id', controller.findById);
}
