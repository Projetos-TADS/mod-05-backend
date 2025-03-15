import { ActorModel } from "../src/models/Actor.model";
import actorService from "../src/services/actor.services";
import { actorReadSchema, actorReturnSchema } from "../src/schemas";
import { ActorCreate, ActorUpdate } from "../src/interfaces";

jest.mock("../src/models/Actor.model");

describe("ActorService - createActor", () => {
  it("deve criar e retornar um ator com os dados corretos", async () => {
    const mockPayload: ActorCreate = {
      name: "John Doe",
      birthDate: "1990-01-01",
      nationality: "American",
    };

    const mockActor = {
      actorId: "035481ce-9863-4511-8902-c7f219a39573",
      ...mockPayload,
    };

    (ActorModel.create as jest.Mock).mockResolvedValue(mockActor);

    const result = await actorService.createActor(mockPayload);

    expect(result).toEqual(actorReturnSchema.parse(mockActor));

    expect(ActorModel.create).toHaveBeenCalledWith(mockPayload);
  });

  it("deve lançar um erro quando a criação do ator falha", async () => {
    const mockPayload: ActorCreate = {
      name: "John Doe",
      birthDate: "1990-01-01",
      nationality: "American",
    };

    (ActorModel.create as jest.Mock).mockRejectedValue(new Error("Database error"));

    await expect(actorService.createActor(mockPayload)).rejects.toThrow("Database error");

    expect(ActorModel.create).toHaveBeenCalledWith(mockPayload);
  });
});

describe("ActorService - getAllActors", () => {
  it("deve retornar uma lista de atores", async () => {
    const mockActors = [
      {
        actorId: "035481ce-9863-4511-8902-c7f219a39573",
        name: "John Doe",
        birthDate: "1990-01-01",
        nationality: "American",
      },
      {
        actorId: "035481ce-9863-4511-8902-c7f219a39574",
        name: "Jane Doe",
        birthDate: "1985-05-15",
        nationality: "Canadian",
      },
    ];

    (ActorModel.findAll as jest.Mock).mockResolvedValue(mockActors);

    const result = await actorService.getAllActors();

    expect(result).toEqual(actorReadSchema.parse(mockActors));
  });

  it("deve retornar uma lista vazia se não houver atores", async () => {
    (ActorModel.findAll as jest.Mock).mockResolvedValue([]);

    const result = await actorService.getAllActors();

    expect(result).toEqual(actorReadSchema.parse([]));
  });

  it("deve lançar um erro quando a busca de atores falha", async () => {
    (ActorModel.findAll as jest.Mock).mockRejectedValue(new Error("Database error"));

    await expect(actorService.getAllActors()).rejects.toThrow("Database error");
  });
});

describe("ActorService - updateActor", () => {
  it("deve atualizar e retornar o ator com os dados corretos", async () => {
    const mockPayload: ActorUpdate = {
      name: "John Doe Updated",
      birthDate: "1990-01-01",
      nationality: "American",
    };

    const mockActor = {
      actorId: "035481ce-9863-4511-8902-c7f219a39573",
      name: "John Doe",
      birthDate: "1990-01-01",
      nationality: "American",
      save: jest
        .fn()
        .mockResolvedValue({ ...mockPayload, actorId: "035481ce-9863-4511-8902-c7f219a39573" }),
    };

    const result = await actorService.updateActor(mockActor as unknown as ActorModel, mockPayload);

    expect(result).toEqual(actorReturnSchema.parse({ ...mockPayload, actorId: mockActor.actorId }));

    expect(mockActor.save).toHaveBeenCalledTimes(1);
  });

  it("deve lançar um erro quando a atualização do ator falha", async () => {
    const mockPayload: ActorUpdate = {
      name: "John Doe Updated",
      birthDate: "1990-01-01",
      nationality: "American",
    };

    const mockActor = {
      actorId: "035481ce-9863-4511-8902-c7f219a39573",
      name: "John Doe",
      birthDate: "1990-01-01",
      nationality: "American",
      save: jest.fn().mockRejectedValue(new Error("Database error")),
    };

    await expect(
      actorService.updateActor(mockActor as unknown as ActorModel, mockPayload)
    ).rejects.toThrow("Database error");

    expect(mockActor.save).toHaveBeenCalledTimes(1);
  });
});

describe("ActorService - deleteActor", () => {
  it("deve deletar o ator com sucesso", async () => {
    const mockActor = {
      actorId: "035481ce-9863-4511-8902-c7f219a39573",
      name: "John Doe",
      birthDate: "1990-01-01",
      nationality: "American",
      destroy: jest.fn().mockResolvedValue(undefined),
    };

    await actorService.deleteActor(mockActor as unknown as ActorModel);

    expect(mockActor.destroy).toHaveBeenCalledTimes(1);
  });

  it("deve lançar um erro quando a deleção do ator falha", async () => {
    const mockActor = {
      actorId: "035481ce-9863-4511-8902-c7f219a39573",
      name: "John Doe",
      birthDate: "1990-01-01",
      nationality: "American",
      destroy: jest.fn().mockRejectedValue(new Error("Database error")),
    };

    await expect(actorService.deleteActor(mockActor as unknown as ActorModel)).rejects.toThrow(
      "Database error"
    );

    expect(mockActor.destroy).toHaveBeenCalledTimes(1);
  });
});
