import { FastifyRequest, FastifyReply } from "fastify";
import { SendNotification } from "../../../../application/usecases/SendNotification";
import { PrismaNotificationGateway } from "../../../database/Prisma/gateway/PrismaNotificationGateway";
import { MarkNotificationAsFailed } from "../../../../application/usecases/MarkNotificationAsFailed ";
import { Notification } from "../../../../domain/aggregate/Notification";
import { NodemailerEmailService } from "../../../service/NodemailerEmailService";
import { WhatsAppService } from "../../../service/WhatsappService";
import dotenv from "dotenv";

dotenv.config();

const notificationGateway = new PrismaNotificationGateway();
const emailGateway = new NodemailerEmailService();
const whatsappGateway = new WhatsAppService();

const sendNotificationUseCase = new SendNotification(
  notificationGateway,
  emailGateway,
  whatsappGateway
);

const markNotificationAsFailedUseCase = new MarkNotificationAsFailed(notificationGateway);

export class NotificationController {
  async send(request: FastifyRequest, reply: FastifyReply) {
    const {
      id,
      agreementId,
      toClientId,
      channel,
      message,
      toEmail,
      toPhoneNumber: phoneFromBody,
    } = request.body as any;

    const toPhoneNumber = channel === "WHATSAPP" ? phoneFromBody : undefined;

    try {
      await sendNotificationUseCase.execute({
        id,
        agreementId,
        toClientId,
        channel,
        message,
        toEmail,
        toPhoneNumber,
      });

      return reply
        .status(201)
        .send({ message: "Notification created and sent." });
    } catch (error: any) {
      console.error("Erro ao enviar notificação:", error);
      return reply
        .status(500)
        .send({ error: error.message || "Erro interno ao enviar notificação" });
    }
  }

  async markFailed(request: FastifyRequest, reply: FastifyReply) {
    const { notificationId } = request.params as any;
    const { errorMessage } = request.body as any;

    await markNotificationAsFailedUseCase.execute({ notificationId, errorMessage });

    return reply.status(200).send({ message: "Notification marked as failed" });
  }

  async getById(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };
    const notification = await notificationGateway.findById(id);

    if (!notification) {
      return reply.status(404).send({ message: "Notification not found" });
    }

    return reply.status(200).send(notification);
  }

  async getByAgreementId(request: FastifyRequest, reply: FastifyReply) {
    const { agreementId } = request.params as { agreementId: string };
    const notifications = await notificationGateway.findByAgreementId(agreementId);

    return reply.status(200).send(notifications);
  }

  async getByClientId(request: FastifyRequest, reply: FastifyReply) {
    const { clientId } = request.params as { clientId: string };
    const notifications = await notificationGateway.findByClientId(clientId);

    return reply.status(200).send(notifications);
  }

  async getByStatus(request: FastifyRequest, reply: FastifyReply) {
    const { status } = request.params as {
      status: keyof typeof Notification.Status;
    };

    const notifications = await notificationGateway.findAllByStatus(status);

    return reply.status(200).send(notifications);
  }
}
