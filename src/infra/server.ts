import { fastify } from './fastifyInstance';
import { agreementRoutes } from './http/fastfy/routes/AgreementRoutes';
import { clientRoutes } from './http/fastfy/routes/ClientRoutes';
import { notificationRoutes } from './http/fastfy/routes/NotificationRoutes';
import 'dotenv/config';



async function start() {
  fastify.register(clientRoutes, { prefix: '/clients' });
  fastify.register(agreementRoutes, { prefix: '/agreements' });
  fastify.register(notificationRoutes, { prefix: '/notifications' });

  try {
    await fastify.listen({ port: 3333, host: '0.0.0.0' });
    console.log('Server is running on http://localhost:3333');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

start();
