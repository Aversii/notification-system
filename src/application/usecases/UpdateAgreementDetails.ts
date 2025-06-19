import { AgreementGateway } from "../gateway/AgreementGateway";

export class UpdateAgreementDetails {
  constructor(private readonly agreementGateway: AgreementGateway) {}

  async execute(input: {
    agreementId: string;
    title?: string;
    description?: string;
  }) {
    const agreement = await this.agreementGateway.findById(input.agreementId);
    if (!agreement) throw new Error("Agreement not found");

    if (input.title) {
      agreement.changeTitle(input.title);
    }
    if (input.description) {
      agreement.changeDescription(input.description);
    }

    await this.agreementGateway.update(agreement);
  }
}
