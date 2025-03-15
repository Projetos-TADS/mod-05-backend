import { UserModel } from "../src/models";
import userService from "../src/services/user.services";
import { userReturnSchema, userReadSchema } from "../src/schemas";
import { UserCreate } from "../src/interfaces";

jest.mock("../src/models");

describe("UserService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllUsers", () => {
    it("deve retornar uma lista de usuários", async () => {
      const mockUsers = [
        {
          userId: "035481ce-9863-4511-8902-c7f219a39573",
          name: "John Doe",
          email: "john.doe@example.com",
          cpf: "97185965004",
          admin: false,
        },
        {
          userId: "035481ce-9863-4511-8902-c7f219a39574",
          name: "Jane Doe",
          email: "jane.doe@example.com",
          cpf: "97185965004",
          admin: false,
        },
      ];

      (UserModel.findAll as jest.Mock).mockResolvedValue(mockUsers);

      const result = await userService.getAllUsers();

      expect(result).toEqual(userReadSchema.parse(mockUsers));
    });

    it("deve retornar uma lista vazia se não houver usuários", async () => {
      (UserModel.findAll as jest.Mock).mockResolvedValue([]);

      const result = await userService.getAllUsers();

      expect(result).toEqual(userReadSchema.parse([]));
    });

    it("deve lançar um erro quando a busca de usuários falha", async () => {
      (UserModel.findAll as jest.Mock).mockRejectedValue(new Error("Database error"));

      await expect(userService.getAllUsers()).rejects.toThrow("Database error");
    });
  });

  describe("createUser", () => {
    it("deve criar e retornar um usuário com os dados corretos", async () => {
      const mockPayload: UserCreate = {
        name: "John Doe",
        email: "john.doe@example.com",
        password: "hashedpassword",
        cpf: "97185965004",
        admin: false,
      };

      const mockUser = {
        userId: "035481ce-9863-4511-8902-c7f219a39573",
        ...mockPayload,
      };

      (UserModel.create as jest.Mock).mockResolvedValue(mockUser);

      const result = await userService.createUser(mockPayload);

      expect(result).toEqual(userReturnSchema.parse(mockUser));

      expect(UserModel.create).toHaveBeenCalledWith(mockPayload);
    });

    it("deve lançar um erro quando a criação do usuário falha", async () => {
      const mockPayload: UserCreate = {
        name: "John Doe",
        email: "john.doe@example.com",
        password: "hashedpassword",
        cpf: "97185965004",
        admin: false,
      };

      (UserModel.create as jest.Mock).mockRejectedValue(new Error("Database error"));

      await expect(userService.createUser(mockPayload)).rejects.toThrow("Database error");

      expect(UserModel.create).toHaveBeenCalledWith(mockPayload);
    });
  });

  describe("deleteUser", () => {
    it("deve deletar o usuário com sucesso", async () => {
      const mockUser = {
        userId: "035481ce-9863-4511-8902-c7f219a39573",
        name: "John Doe",
        email: "john.doe@example.com",
        password: "hashedpassword",
        destroy: jest.fn().mockResolvedValue(undefined),
      };

      await userService.deleteUser(mockUser as unknown as UserModel);

      expect(mockUser.destroy).toHaveBeenCalledTimes(1);
    });

    it("deve lançar um erro quando a deleção do usuário falha", async () => {
      const mockUser = {
        userId: "035481ce-9863-4511-8902-c7f219a39573",
        name: "John Doe",
        email: "john.doe@example.com",
        password: "hashedpassword",
        destroy: jest.fn().mockRejectedValue(new Error("Database error")),
      };

      await expect(userService.deleteUser(mockUser as unknown as UserModel)).rejects.toThrow(
        "Database error"
      );

      expect(mockUser.destroy).toHaveBeenCalledTimes(1);
    });
  });
});
