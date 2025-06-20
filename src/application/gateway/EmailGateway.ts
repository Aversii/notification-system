export interface NotificationChannelGateway  {
  send(to: string, subject: string, body: string): Promise<void>;
}
