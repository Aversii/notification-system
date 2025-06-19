import { MessageContent } from "../value-objects/MessageContent";

export class AgreementResponse {
  private readonly _id: string;
  private readonly _agreementId: string;
  private readonly _senderClientId: string;
  private readonly _message: MessageContent;
  private readonly _createdAt: Date;

  constructor(
    id: string,
    agreementId: string,
    senderClientId: string,
    message: MessageContent,
    createdAt: Date = new Date(),
  ) {
    this._id = id;
    this._agreementId = agreementId;
    this._senderClientId = senderClientId;
    this._message = message;
    this._createdAt = createdAt;
  }

  get id() { return this._id; }
  get agreementId() { return this._agreementId; }
  get senderClientId() { return this._senderClientId; }
  get message() { return this._message; }
  get createdAt() { return this._createdAt; }
}
