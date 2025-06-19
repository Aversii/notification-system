import { Client } from "../../domain/entities/Client";

export interface ClientGateway {
  findById(id: string): Promise<Client | null>;
  save(client: Client): Promise<void>;
  update(client: Client): Promise<void>;
}
