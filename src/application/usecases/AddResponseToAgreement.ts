import { AgreementResponse } from "../../domain/entities/AgreementResponse";
import { MessageContent } from "../../domain/value-objects/MessageContent";
import { AgreementGateway } from "../gateway/AgreementGateway";


export class AddResponseToAgreement {
  constructor(private readonly agreementGateway: AgreementGateway) {}

  async execute(input: {
    agreementId: string;
    responseId: string;
    senderClientId: string;
    message: string;
  }) {
    const agreement = await this.agreementGateway.findById(input.agreementId);
    if (!agreement) throw new Error("Agreement not found");

    const response = new AgreementResponse(
      input.responseId,
      input.agreementId,
      input.senderClientId,
      new MessageContent(input.message)
    );

    agreement.addResponse(response);

    await this.agreementGateway.update(agreement);

    return response;
  }
}
