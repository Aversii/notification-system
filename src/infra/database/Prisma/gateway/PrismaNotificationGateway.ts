import { PrismaClient } from '@prisma/client';
import { Notification } from '../../../../domain/aggregate/Notification';
import { MessageContent } from '../../../../domain/value-objects/MessageContent';
import { NotificationGateway } from '../../../../application/gateway/NotificationGateway';

function generateId() {
  return (
    Date.now().toString(36) + 
    Math.random().toString(36).substring(2, 10)
  );
}

export class PrismaNotificationGateway implements NotificationGateway {
  constructor(private readonly prisma = new PrismaClient()) {}

  async findById(id: string): Promise<Notification | null> {
    const notification = await this.prisma.notification.findUnique({
      where: { id },
    });

    if (!notification) return null;

    return new Notification(
      notification.id,
      notification.agreementId,
      notification.toClientId,
      notification.channel as keyof typeof Notification.Channel,
      new MessageContent(notification.message),
      notification.status as keyof typeof Notification.Status,
      notification.createdAt,
      notification.sentAt ?? undefined,
      notification.errorMessage ?? undefined,
    );
  }

  async findByAgreementId(agreementId: string): Promise<Notification[]> {
    const notifications = await this.prisma.notification.findMany({
      where: { agreementId },
    });

    return notifications.map(n => new Notification(
      n.id,
      n.agreementId,
      n.toClientId,
      n.channel as keyof typeof Notification.Channel,
      new MessageContent(n.message),
      n.status as keyof typeof Notification.Status,
      n.createdAt,
      n.sentAt ?? undefined,
      n.errorMessage ?? undefined,
    ));
  }

  async findByClientId(clientId: string): Promise<Notification[]> {
    const notifications = await this.prisma.notification.findMany({
      where: { toClientId: clientId },
    });

    return notifications.map(n => new Notification(
      n.id,
      n.agreementId,
      n.toClientId,
      n.channel as keyof typeof Notification.Channel,
      new MessageContent(n.message),
      n.status as keyof typeof Notification.Status,
      n.createdAt,
      n.sentAt ?? undefined,
      n.errorMessage ?? undefined,
    ));
  }

  async findAllByStatus(status: keyof typeof Notification.Status): Promise<Notification[]> {
    const notifications = await this.prisma.notification.findMany({
      where: { status },
    });

    return notifications.map(n => new Notification(
      n.id,
      n.agreementId,
      n.toClientId,
      n.channel as keyof typeof Notification.Channel,
      new MessageContent(n.message),
      n.status as keyof typeof Notification.Status,
      n.createdAt,
      n.sentAt ?? undefined,
      n.errorMessage ?? undefined,
    ));
  }

  async save(notification: Notification): Promise<void> {
    await this.prisma.notification.create({
      data: {
        id: notification.id,
        agreementId: notification.agreementId,
        toClientId: notification.toClientId,
        channel: notification.channel,
        message: notification.message.value,
        status: notification.status,
        createdAt: notification.createdAt,
        sentAt: notification.sentAt,
        errorMessage: notification.errorMessage,
      },
    });
  }

  async update(notification: Notification): Promise<void> {
    await this.prisma.notification.update({
      where: { id: notification.id },
      data: {
        status: notification.status,
        sentAt: notification.sentAt,
        errorMessage: notification.errorMessage,
      },
    });
  }

  async send(input: { toClientId: string; subject: string; message: string }): Promise<void> {
    const id = generateId();
    const now = new Date();

    await this.prisma.notification.create({
      data: {
        id,
        agreementId: '',
        toClientId: input.toClientId,
        channel: 'email',
        message: input.message,
        status: 'pending',
        createdAt: now,
      },
    });


    await this.prisma.notification.update({
      where: { id },
      data: {
        status: 'sent',
        sentAt: new Date(),
      },
    });
  }
}
