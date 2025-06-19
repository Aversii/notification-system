import { MessageContent } from "../../domain/value-objects/MessageContent";
import { NotificationGateway } from "../gateway/NotificationGateway";
import { Notification } from '../../domain/aggregate/Notification';



export class SendNotification {
  constructor(private readonly notificationGateway: NotificationGateway) {}

  async execute(input: {
    id: string;
    agreementId: string;
    toClientId: string;
    channel: keyof typeof Notification.Channel;
    message: string;
  }) {
    const notification = new Notification(
      input.id,
      input.agreementId,
      input.toClientId,
      input.channel,
      new MessageContent(input.message)
    );

    notification.markAsSent();

    await this.notificationGateway.save(notification);

    return notification;
  }
}
