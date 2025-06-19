import { Email } from "../value-objects/Email";
import { PhoneNumber } from "../value-objects/PhoneNumber";

export class Client {
  private readonly _id: string;
  private _name: string;
  private _email: Email;
  private _phoneNumber?: PhoneNumber;
  private readonly _createdAt: Date;

  constructor(
    id: string,
    name: string,
    email: Email,
    phoneNumber?: PhoneNumber,
    createdAt: Date = new Date(),
  ) {
    this._id = id;
    this._name = name;
    this._email = email;
    this._phoneNumber = phoneNumber;
    this._createdAt = createdAt;
  }

  get id() { return this._id; }
  get name() { return this._name; }
  get email() { return this._email; }
  get phoneNumber() { return this._phoneNumber; }
  get createdAt() { return this._createdAt; }

  public changeName(newName: string) {
    if (newName.trim() === '') throw new Error('Name cannot be empty');
    this._name = newName;
  }

  public changeEmail(newEmail: Email) {
    this._email = newEmail;
  }

  public changePhoneNumber(newPhoneNumber: PhoneNumber) {
    this._phoneNumber = newPhoneNumber;
  }
}
