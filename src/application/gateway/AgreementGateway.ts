import { Agreement } from "../../domain/aggregate/Agreement";

export interface AgreementGateway {
  findById(id: string): Promise<Agreement | null>;
  save(agreement: Agreement): Promise<void>;
  update(agreement: Agreement): Promise<void>;
}
