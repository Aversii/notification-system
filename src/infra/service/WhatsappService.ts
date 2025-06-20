import { Client, LocalAuth } from "whatsapp-web.js";
import qrcode from "qrcode-terminal";
import { NotificationChannelGateway } from "../../application/gateway/EmailGateway";

export class WhatsAppService implements NotificationChannelGateway {
  private client: Client;
  private isReady: boolean = false;
  private readyPromise: Promise<void>;

  constructor() {
    this.client = new Client({
      authStrategy: new LocalAuth(),
      puppeteer: {
        headless: true,
        args: [
          "--no-sandbox",
          "--disable-setuid-sandbox",
          "--disable-dev-shm-usage",
          "--disable-accelerated-2d-canvas",
          "--no-first-run",
          "--no-zygote",
          "--disable-gpu",
        ],
      },
    });

    this.readyPromise = new Promise((resolve) => {
      this.client.on("qr", (qr) => {
        console.log("📲 Escaneie o QR Code com seu WhatsApp:");
        qrcode.generate(qr, { small: true });
      });

      this.client.on("ready", () => {
        console.log("✅ WhatsApp conectado e pronto!");
        this.isReady = true;
        resolve();
      });

      this.client.on("auth_failure", (msg) => {
        console.error("❌ Falha na autenticação do WhatsApp:", msg);
      });

      this.client.on("disconnected", (reason) => {
        console.warn("⚠️ WhatsApp desconectado:", reason);
        this.isReady = false;
      });
    });

    this.client.initialize().catch(error => {
      console.error("❌ Erro ao inicializar WhatsApp client:", error);
    });
  }

  async waitUntilReady(): Promise<void> {
    if (!this.isReady) {
      await this.readyPromise;
    }
  }

  async send(to: string, subject: string, body: string): Promise<void> {
    try {
      await this.waitUntilReady();
      
      const chatId = `${to}@c.us`;
      const message = `📝 *${subject}*\n${body}`;

      const response = await this.client.sendMessage(chatId, message);
    } catch (error) {
      console.error("❌ Erro ao enviar WhatsApp:", error);
      throw error;
    }
  }
}