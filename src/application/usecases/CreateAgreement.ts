import { Agreement } from "../../domain/aggregate/Agreement";
import { AgreementGateway } from "../gateway/AgreementGateway";


export class CreateAgreement {
  constructor(private readonly agreementGateway: AgreementGateway) {}

  async execute(input: {
    id: string;
    title: string;
    description: string;
    clientOneId: string;
    clientTwoId: string;
  }) {
    const agreement = new Agreement(
      input.id,
      input.title,
      input.description,
      input.clientOneId,
      input.clientTwoId
    );

    await this.agreementGateway.save(agreement);

    return agreement;
  }
}
