import { ActorModel } from "../src/models/Actor.model";
import actorService from "../src/services/actor.services";
import { actorReadSchema, actorReturnSchema } from "../src/schemas";
import { ActorCreate, ActorUpdate } from "../src/interfaces";

jest.mock("../src/models/Actor.model");

describe("ActorService - createActor", () => {
  it("should create and return an actor with correct data", async () => {
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

  it("should throw an error when actor creation fails", async () => {
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
  it("should return a list of actors", async () => {
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

  it("should return an empty list if there are no actors", async () => {
    (ActorModel.findAll as jest.Mock).mockResolvedValue([]);

    const result = await actorService.getAllActors();

    expect(result).toEqual(actorReadSchema.parse([]));
  });

  it("should throw an error when fetching actors fails", async () => {
    (ActorModel.findAll as jest.Mock).mockRejectedValue(new Error("Database error"));

    await expect(actorService.getAllActors()).rejects.toThrow("Database error");
  });
});

describe("ActorService - updateActor", () => {
  it("should update and return the actor with correct data", async () => {
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

  it("should throw an error when updating the actor fails", async () => {
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
  it("should successfully delete the actor", async () => {
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

  it("should throw an error when deleting the actor fails", async () => {
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
