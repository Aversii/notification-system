export interface WhatsappGateway {
  send(to: string, message: string): Promise<void>;
}
