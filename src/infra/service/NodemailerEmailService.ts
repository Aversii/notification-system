import nodemailer from 'nodemailer';
import { NotificationChannelGateway  } from '../../application/gateway/EmailGateway';
import dotenv from 'dotenv';

dotenv.config();

export class NodemailerEmailService implements NotificationChannelGateway  {
  private transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  constructor() {

    this.transporter.verify((error, success) => {
      if (error) {
        console.error('❌ Falha na conexão SMTP:', error);
      } else {
        console.log('✅ Conexão SMTP OK, pronto para enviar emails');
      }
    });
  }

  async send(to: string, subject: string, body: string): Promise<void> {
    try {
      const info = await this.transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject,
        text: body,
      });

      console.log('📤 Email enviado com sucesso. ID da mensagem:', info.messageId);
    } catch (error) {
      console.error('❌ Erro ao enviar email:', error);
      throw error;
    }
  }
}
