import { PrismaClient } from '@prisma/client';
import { Client } from '../../../../domain/entities/Client';
import { Email } from '../../../../domain/value-objects/Email';
import { PhoneNumber } from '../../../../domain/value-objects/PhoneNumber';
import { ClientGateway } from '../../../../application/gateway/ClientGateway';

export class PrismaClientGateway implements ClientGateway {
  constructor(private readonly prisma = new PrismaClient()) {}

  async findById(id: string): Promise<Client | null> {
    const client = await this.prisma.client.findUnique({ where: { id } });
    if (!client) return null;

    return new Client(
      client.id,
      client.name,
      new Email(client.email),
      client.phoneNumber ? new PhoneNumber(client.phoneNumber) : undefined,
      client.createdAt
    );
  }

  async save(client: Client): Promise<void> {
    await this.prisma.client.create({
      data: {
        id: client.id,
        name: client.name,
        email: client.email.value,
        phoneNumber: client.phoneNumber?.value,
        createdAt: client.createdAt,
      },
    });
  }

  async update(client: Client): Promise<void> {
    await this.prisma.client.update({
      where: { id: client.id },
      data: {
        name: client.name,
        email: client.email.value,
        phoneNumber: client.phoneNumber?.value,
      },
    });
  }
}
