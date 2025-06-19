import { MessageContent } from '../value-objects/MessageContent';

export class Notification {
  static Status = {
    PENDING: 'PENDING',
    SENT: 'SENT',
    FAILED: 'FAILED',
  } as const;

  static Channel = {
    EMAIL: 'EMAIL',
    WHATSAPP: 'WHATSAPP',
  } as const;

  private readonly _id: string;
  private readonly _agreementId: string;
  private readonly _toClientId: string;
  private readonly _channel: keyof typeof Notification.Channel;
  private readonly _message: MessageContent;
  private _status: keyof typeof Notification.Status;
  private readonly _createdAt: Date;
  private _sentAt?: Date;
  private _errorMessage?: string;

  constructor(
    id: string,
    agreementId: string,
    toClientId: string,
    channel: keyof typeof Notification.Channel,
    message: MessageContent,
    status: keyof typeof Notification.Status = Notification.Status.PENDING,
    createdAt: Date = new Date(),
    sentAt?: Date,
    errorMessage?: string,
  ) {
    this._id = id;
    this._agreementId = agreementId;
    this._toClientId = toClientId;
    this._channel = channel;
    this._message = message;
    this._status = status;
    this._createdAt = createdAt;
    this._sentAt = sentAt;
    this._errorMessage = errorMessage;
  }

  get id() { return this._id; }
  get agreementId() { return this._agreementId; }
  get toClientId() { return this._toClientId; }
  get channel() { return this._channel; }
  get message() { return this._message; }
  get status() { return this._status; }
  get createdAt() { return this._createdAt; }
  get sentAt() { return this._sentAt; }
  get errorMessage() { return this._errorMessage; }

  public markAsSent() {
    this._status = Notification.Status.SENT;
    this._sentAt = new Date();
  }

  public markAsFailed(errorMessage: string) {
    this._status = Notification.Status.FAILED;
    this._errorMessage = errorMessage;
    this._sentAt = new Date();
  }
}
