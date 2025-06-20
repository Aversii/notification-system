import { PrismaClient } from '@prisma/client';
import { Agreement } from '../../../../domain/aggregate/Agreement';
import { AgreementResponse } from '../../../../domain/entities/AgreementResponse';
import { MessageContent } from '../../../../domain/value-objects/MessageContent';
import { AgreementGateway } from '../../../../application/gateway/AgreementGateway';

export class PrismaAgreementGateway implements AgreementGateway {
  constructor(private readonly prisma = new PrismaClient()) {}

  async findById(id: string): Promise<Agreement | null> {
    const agreement = await this.prisma.agreement.findUnique({
      where: { id },
      include: { responses: true },
    });

    if (!agreement) return null;

    const domainAgreement = new Agreement(
      agreement.id,
      agreement.title,
      agreement.description,
      agreement.clientOneId,
      agreement.clientTwoId,
      agreement.status as keyof typeof Agreement.Status,
      agreement.createdAt,
      agreement.lastUpdatedAt,
    );

    agreement.responses.forEach(response => {
      domainAgreement.addResponse(
        new AgreementResponse(
          response.id,
          response.agreementId,
          response.senderClientId,
          new MessageContent(response.message),
          response.createdAt,
        )
      );
    });

    return domainAgreement;
  }

  async save(agreement: Agreement): Promise<void> {
    await this.prisma.agreement.create({
      data: {
        id: agreement.id,
        title: agreement.title,
        description: agreement.description,
        status: agreement.status,
        clientOneId: agreement.clientOneId,
        clientTwoId: agreement.clientTwoId,
        createdAt: agreement.createdAt,
        lastUpdatedAt: agreement.lastUpdatedAt,
      },
    });
  }

  async update(agreement: Agreement): Promise<void> {
    await this.prisma.agreement.update({
      where: { id: agreement.id },
      data: {
        title: agreement.title,
        description: agreement.description,
        status: agreement.status,
        lastUpdatedAt: agreement.lastUpdatedAt,
      },
    });
  }
}
