import { FastifyReply, FastifyRequest } from 'fastify';
import { PrismaClientGateway } from '../../../database/Prisma/gateway/PrismaClientGateway';
import { CreateClient } from '../../../../application/usecases/CreateClient';


const clientGateway = new PrismaClientGateway();

export class ClientController {
  async create(request: FastifyRequest, reply: FastifyReply) {
    const { id, name, email, phoneNumber } = request.body as any;
    const usecase = new CreateClient(clientGateway);
    await usecase.execute({ id, name, email, phoneNumber });

    return reply.status(201).send({ message: 'Client created' });
  }

  async update(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as any;
    const { name, email, phoneNumber } = request.body as any;

    const usecase = new CreateClient(clientGateway);

    await usecase.execute({ id, name, email, phoneNumber });

    return reply.status(200).send({ message: 'Client updated' });
  }

  async findById(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as any;

    const client = await clientGateway.findById(id);

    if (!client) {
      return reply.status(404).send({ error: 'Client not found' });
    }

    return reply.status(200).send({
      id: client.id,
      name: client.name,
      email: client.email.value,
      phoneNumber: client.phoneNumber?.value,
      createdAt: client.createdAt,
    });
  }
}
