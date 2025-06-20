import { Client, LocalAuth } from "whatsapp-web.js";
import qrcode from "qrcode-terminal";
import { NotificationChannelGateway } from "../../application/gateway/EmailGateway";

export class WhatsAppService implements NotificationChannelGateway {
  private client: Client;

  constructor() {
    this.client = new Client({
      authStrategy: new LocalAuth(),
    });

    this.client.on("qr", (qr) => {
      console.log("📲 Escaneie o QR Code com seu WhatsApp:");
      qrcode.generate(qr, { small: true });
    });

    this.client.on("ready", () => {
      console.log("✅ WhatsApp conectado e pronto!");
    });

    this.client.initialize();
  }

  async send(to: string, subject: string, body: string): Promise<void> {
    const chatId = `${to}@c.us`;
    const message = `📝 *${subject}*\n${body}`;

    console.log("🚀 Tentando enviar WhatsApp para:", chatId);
    console.log("📄 Conteúdo da mensagem:", message);

    try {
      const response = await this.client.sendMessage(chatId, message);
      console.log(`✅ Mensagem enviada. ID: ${response.id.id}`);
    } catch (error) {
      console.error("❌ Erro ao enviar WhatsApp:", error);
      throw error;
    }
  }
}
