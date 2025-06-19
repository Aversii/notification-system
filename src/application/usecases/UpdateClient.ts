import { Email } from "../../domain/value-objects/Email";
import { PhoneNumber } from "../../domain/value-objects/PhoneNumber";
import { ClientGateway } from "../gateway/ClientGateway";

export class UpdateClient {
  constructor(private readonly clientGateway: ClientGateway) {}

  async execute(input: {
    clientId: string;
    name?: string;
    email?: string;
    phoneNumber?: string;
  }) {
    const client = await this.clientGateway.findById(input.clientId);
    if (!client) throw new Error("Client not found");

    if (input.name) client.changeName(input.name);
    if (input.email) client.changeEmail(new Email(input.email));
    if (input.phoneNumber) client.changePhoneNumber(new PhoneNumber(input.phoneNumber));

    await this.clientGateway.update(client);
  }
}
