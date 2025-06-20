import { FastifyInstance } from 'fastify';
import { NotificationController } from '../controllers/NotificationController';

export async function notificationRoutes(app: FastifyInstance) {
  const controller = new NotificationController();

  app.post('/', controller.send);
  app.patch('/fail/:notificationId', controller.markFailed);
  app.get('/agreement/:agreementId', controller.getByAgreementId);
  app.get('/client/:clientId', controller.getByClientId);
  app.get('/status/:status', controller.getByStatus);
}
