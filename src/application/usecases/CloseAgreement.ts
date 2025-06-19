import { AgreementGateway } from "../gateway/AgreementGateway";

export class CloseAgreement {
  constructor(private readonly agreementGateway: AgreementGateway) {}

  async execute(input: { agreementId: string }) {
    const agreement = await this.agreementGateway.findById(input.agreementId);
    if (!agreement) throw new Error("Agreement not found");

    agreement.closeAgreement();

    await this.agreementGateway.update(agreement);
  }
}
