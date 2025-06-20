import { FastifyInstance } from 'fastify';
import { AgreementController } from '../controllers/AgreementController';

export async function agreementRoutes(app: FastifyInstance) {
  const controller = new AgreementController();

  app.post('/', controller.create);
  app.post('/response', controller.addResponse);
  app.patch('/close/:agreementId', controller.close);
  app.patch('/details/:agreementId', controller.changeDetails);
}
