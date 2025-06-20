import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaAgreementGateway } from "../../../database/Prisma/gateway/PrismaAgreementGateway";
import { CreateAgreement } from "../../../../application/usecases/CreateAgreement";
import { AddResponseToAgreement } from "../../../../application/usecases/AddResponseToAgreement";
import { CloseAgreement } from "../../../../application/usecases/CloseAgreement";
import { UpdateAgreementDetails } from "../../../../application/usecases/UpdateAgreementDetails";

const agreementGateway = new PrismaAgreementGateway();


export class AgreementController {
  async create(request: FastifyRequest, reply: FastifyReply) {
    const { id, title, description, clientOneId, clientTwoId } =
      request.body as any;

    const usecase = new CreateAgreement(agreementGateway);
    await usecase.execute({ id, title, description, clientOneId, clientTwoId });

    return reply.status(201).send({ message: "Agreement created" });
  }

  async addResponse(request: FastifyRequest, reply: FastifyReply) {
    const { agreementId, responseId, senderClientId, message } =
      request.body as any;

    const usecase = new AddResponseToAgreement(agreementGateway);
    await usecase.execute({
      agreementId,
      responseId,
      senderClientId,
      message,
    });

    return reply.status(200).send({ message: "Response added to agreement" });
  }

  async close(request: FastifyRequest, reply: FastifyReply) {
    const { agreementId } = request.params as any;

    const usecase = new CloseAgreement(agreementGateway);
    await usecase.execute({ agreementId });

    return reply.status(200).send({ message: "Agreement closed" });
  }

  async changeDetails(request: FastifyRequest, reply: FastifyReply) {
    const { agreementId } = request.params as any;
    const { title, description } = request.body as any;

    const usecase = new UpdateAgreementDetails(agreementGateway);
    await usecase.execute({ agreementId, title, description });

    return reply.status(200).send({ message: "Agreement details updated" });
  }
}
