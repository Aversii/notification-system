import { MessageContent } from "../../domain/value-objects/MessageContent";
import { NotificationGateway } from "../gateway/NotificationGateway";
import { Notification } from "../../domain/aggregate/Notification";
import { NotificationChannelGateway } from "../gateway/EmailGateway";

interface Input {
  id: string;
  agreementId: string;
  toClientId: string;
  channel: keyof typeof Notification.Channel;
  message: string;
  toEmail?: string;
  toPhoneNumber?: string;
}

export class SendNotification {
  private channelGateways: Record<string, NotificationChannelGateway>;

  constructor(
    private readonly notificationGateway: NotificationGateway,
    emailGateway: NotificationChannelGateway,
    whatsappGateway: NotificationChannelGateway
  ) {
    this.channelGateways = {
      EMAIL: emailGateway,
      WHATSAPP: whatsappGateway,
    };
  }

  async execute(input: Input) {
    const notification = new Notification(
      input.id,
      input.agreementId,
      input.toClientId,
      input.channel,
      new MessageContent(input.message)
    );

    try {
      const gateway = this.channelGateways[input.channel];
      if (!gateway) {
        throw new Error(`No gateway found for channel ${input.channel}`);
      }

      const destination = input.channel === 'EMAIL' ? input.toEmail : input.toPhoneNumber;

      if (!destination) {
        throw new Error(`Destination required for channel ${input.channel}`);
      }

      await gateway.send(
        destination,
        'Nova Notificação',
        input.message
      );

      notification.markAsSent();
    } catch (error: any) {
      notification.markAsFailed(error.message);
    }

    await this.notificationGateway.save(notification);

    return notification;
  }
}
