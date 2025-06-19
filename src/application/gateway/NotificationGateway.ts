import { Notification } from "../../domain/aggregate/Notification";

export interface NotificationGateway {
  save(notification: Notification): Promise<void>;
  update(notification: Notification): Promise<void>;
  findById(id: string): Promise<Notification | null>;
  findByAgreementId(agreementId: string): Promise<Notification[]>;
  findByClientId(clientId: string): Promise<Notification[]>;
  findAllByStatus(status: keyof typeof Notification.Status): Promise<Notification[]>;
}
