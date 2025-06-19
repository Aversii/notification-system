import { NotificationGateway } from "../gateway/NotificationGateway";

export class MarkNotificationAsFailed {
  constructor(private readonly notificationGateway: NotificationGateway) {}

  async execute(input: {
    notificationId: string;
    errorMessage: string;
  }) {
    const notification = await this.notificationGateway.findById(input.notificationId);
    if (!notification) throw new Error("Notification not found");

    notification.markAsFailed(input.errorMessage);

    await this.notificationGateway.update(notification);
  }
}
