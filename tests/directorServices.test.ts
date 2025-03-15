import { DirectorModel } from "../src/models/Director.model";
import directorService from "../src/services/director.services";
import { directorReturnSchema, directorReadSchema } from "../src/schemas";
import { DirectorCreate, DirectorUpdate } from "../src/interfaces";

jest.mock("../src/models/Director.model");

describe("DirectorService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllDirectors", () => {
    it("deve retornar uma lista de diretores", async () => {
      const mockDirectors = [
        {
          directorId: "035481ce-9863-4511-8902-c7f219a39573",
          name: "Christopher Nolan",
          birthDate: "1970-07-30",
          nationality: "British",
        },
        {
          directorId: "035481ce-9863-4511-8902-c7f219a39574",
          name: "Quentin Tarantino",
          birthDate: "1963-03-27",
          nationality: "American",
        },
      ];

      (DirectorModel.findAll as jest.Mock).mockResolvedValue(mockDirectors);

      const result = await directorService.getAllDirectors();

      expect(result).toEqual(directorReadSchema.parse(mockDirectors));
    });

    it("deve retornar uma lista vazia se não houver diretores", async () => {
      (DirectorModel.findAll as jest.Mock).mockResolvedValue([]);

      const result = await directorService.getAllDirectors();

      expect(result).toEqual(directorReadSchema.parse([]));
    });

    it("deve lançar um erro quando a busca de diretores falha", async () => {
      (DirectorModel.findAll as jest.Mock).mockRejectedValue(new Error("Database error"));

      await expect(directorService.getAllDirectors()).rejects.toThrow("Database error");
    });
  });

  describe("createDirector", () => {
    it("deve criar e retornar um diretor com os dados corretos", async () => {
      const mockPayload: DirectorCreate = {
        name: "Christopher Nolan",
        birthDate: "1970-07-30",
        nationality: "British",
      };

      const mockDirector = {
        directorId: "035481ce-9863-4511-8902-c7f219a39573",
        ...mockPayload,
      };

      (DirectorModel.create as jest.Mock).mockResolvedValue(mockDirector);

      const result = await directorService.createDirector(mockPayload);

      expect(result).toEqual(directorReturnSchema.parse(mockDirector));

      expect(DirectorModel.create).toHaveBeenCalledWith(mockPayload);
    });

    it("deve lançar um erro quando a criação do diretor falha", async () => {
      const mockPayload: DirectorCreate = {
        name: "Christopher Nolan",
        birthDate: "1970-07-30",
        nationality: "British",
      };

      (DirectorModel.create as jest.Mock).mockRejectedValue(new Error("Database error"));

      await expect(directorService.createDirector(mockPayload)).rejects.toThrow("Database error");

      expect(DirectorModel.create).toHaveBeenCalledWith(mockPayload);
    });
  });

  describe("updateDirector", () => {
    it("deve atualizar e retornar o diretor com os dados corretos", async () => {
      const mockPayload: DirectorUpdate = {
        name: "Christopher Nolan Updated",
        birthDate: "1970-07-30",
        nationality: "British",
      };

      const mockDirector = {
        directorId: "035481ce-9863-4511-8902-c7f219a39573",
        name: "Christopher Nolan",
        birthDate: "1970-07-30",
        nationality: "British",
        save: jest.fn().mockResolvedValue({
          ...mockPayload,
          directorId: "035481ce-9863-4511-8902-c7f219a39573",
        }),
      };

      const result = await directorService.updateDirector(
        mockDirector as unknown as DirectorModel,
        mockPayload
      );

      expect(result).toEqual(
        directorReturnSchema.parse({ ...mockPayload, directorId: mockDirector.directorId })
      );

      expect(mockDirector.save).toHaveBeenCalledTimes(1);
    });

    it("deve lançar um erro quando a atualização do diretor falha", async () => {
      const mockPayload: DirectorUpdate = {
        name: "Christopher Nolan Updated",
        birthDate: "1970-07-30",
        nationality: "British",
      };

      const mockDirector = {
        directorId: "035481ce-9863-4511-8902-c7f219a39573",
        name: "Christopher Nolan",
        birthDate: "1970-07-30",
        nationality: "British",
        save: jest.fn().mockRejectedValue(new Error("Database error")),
      };

      await expect(
        directorService.updateDirector(mockDirector as unknown as DirectorModel, mockPayload)
      ).rejects.toThrow("Database error");

      expect(mockDirector.save).toHaveBeenCalledTimes(1);
    });
  });

  describe("deleteDirector", () => {
    it("deve deletar o diretor com sucesso", async () => {
      const mockDirector = {
        directorId: "035481ce-9863-4511-8902-c7f219a39573",
        name: "Christopher Nolan",
        birthDate: "1970-07-30",
        nationality: "British",
        destroy: jest.fn().mockResolvedValue(undefined),
      };

      await directorService.deleteDirector(mockDirector as unknown as DirectorModel);

      expect(mockDirector.destroy).toHaveBeenCalledTimes(1);
    });

    it("deve lançar um erro quando a deleção do diretor falha", async () => {
      const mockDirector = {
        directorId: "035481ce-9863-4511-8902-c7f219a39573",
        name: "Christopher Nolan",
        birthDate: "1970-07-30",
        nationality: "British",
        destroy: jest.fn().mockRejectedValue(new Error("Database error")),
      };

      await expect(
        directorService.deleteDirector(mockDirector as unknown as DirectorModel)
      ).rejects.toThrow("Database error");

      expect(mockDirector.destroy).toHaveBeenCalledTimes(1);
    });
  });
});
