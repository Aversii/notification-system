export class MessageContent {
  private readonly _value: string;
  private static forbiddenWords = ['bobão', 'boboca', 'bobinho'];

  constructor(message: string) {
    if (!message || message.trim().length === 0) {
      throw new Error('Message cannot be empty');
    }
    if (message.length > 1000) {
      throw new Error('Message is too long');
    }
    if (this.containsForbiddenWords(message)) {
      throw new Error('Message contains prohibited words');
    }
    this._value = message;
  }

  private containsForbiddenWords(message: string): boolean {
    const lowerMessage = message.toLowerCase();
    return MessageContent.forbiddenWords.some(word => lowerMessage.includes(word));
  }

  get value(): string {
    return this._value;
  }
}
