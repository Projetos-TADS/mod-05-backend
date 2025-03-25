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
    it("should return a list of users", async () => {
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

    it("should return an empty list if there are no users", async () => {
      (UserModel.findAll as jest.Mock).mockResolvedValue([]);

      const result = await userService.getAllUsers();

      expect(result).toEqual(userReadSchema.parse([]));
    });

    it("should throw an error when fetching users fails", async () => {
      (UserModel.findAll as jest.Mock).mockRejectedValue(new Error("Database error"));

      await expect(userService.getAllUsers()).rejects.toThrow("Database error");
    });
  });

  describe("createUser", () => {
    it("should create and return a user with correct data", async () => {
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

    it("should throw an error when user creation fails", async () => {
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
    it("should successfully delete the user", async () => {
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

    it("should throw an error when user deletion fails", async () => {
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
