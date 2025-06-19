import { Client } from "../../domain/entities/Client";
import { Email } from "../../domain/value-objects/Email";
import { PhoneNumber } from "../../domain/value-objects/PhoneNumber";
import { ClientGateway } from "../gateway/ClientGateway";

export class CreateClient {
  constructor(private readonly clientGateway: ClientGateway) {}

  async execute(input: {
    id: string;
    name: string;
    email: string;
    phoneNumber?: string;
  }) {
    const client = new Client(
      input.id,
      input.name,
      new Email(input.email),
      input.phoneNumber ? new PhoneNumber(input.phoneNumber) : undefined
    );

    await this.clientGateway.save(client);

    return client;
  }
}
