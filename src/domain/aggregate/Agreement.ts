import { AgreementResponse } from "../entities/AgreementResponse";

export class Agreement {
  static Status = {
    OPEN: 'OPEN',
    IN_NEGOTIATION: 'IN_NEGOTIATION',
    CLOSED: 'CLOSED',
  } as const;
  
  private readonly _id: string;
  private readonly _clientOneId: string;
  private readonly _clientTwoId: string;
  private _title: string;
  private _description: string;
  private _status: keyof typeof Agreement.Status;
  private readonly _createdAt: Date;
  private _lastUpdatedAt: Date;
  private readonly _responses: AgreementResponse[] = [];

  constructor(
    id: string,
    title: string,
    description: string,
    clientOneId: string,
    clientTwoId: string,
    status: keyof typeof Agreement.Status = Agreement.Status.OPEN,
    createdAt: Date = new Date(),
    lastUpdatedAt: Date = new Date(),
  ) {
    this._id = id;
    this._title = title;
    this._description = description;
    this._clientOneId = clientOneId;
    this._clientTwoId = clientTwoId;
    this._status = status;
    this._createdAt = createdAt;
    this._lastUpdatedAt = lastUpdatedAt;
  }

  get id() { return this._id; }
  get clientOneId() { return this._clientOneId; }
  get clientTwoId() { return this._clientTwoId; }
  get title() { return this._title; }
  get description() { return this._description; }
  get status() { return this._status; }
  get createdAt() { return this._createdAt; }
  get lastUpdatedAt() { return this._lastUpdatedAt; }
  get responses() { return [...this._responses]; }

  public addResponse(response: AgreementResponse) {
    this._responses.push(response);
    this._status = Agreement.Status.IN_NEGOTIATION;
    this._lastUpdatedAt = new Date();
  }

  public closeAgreement() {
    if (this._status === Agreement.Status.CLOSED) {
      throw new Error('Agreement is already closed.');
    }
    this._status = Agreement.Status.CLOSED;
    this._lastUpdatedAt = new Date();
  }

  public changeTitle(newTitle: string) {
    if (newTitle.trim() === '') throw new Error('Title cannot be empty');
    this._title = newTitle;
    this._lastUpdatedAt = new Date();
  }

  public changeDescription(newDescription: string) {
    if (newDescription.trim() === '') throw new Error('Description cannot be empty');
    this._description = newDescription;
    this._lastUpdatedAt = new Date();
  }
}
