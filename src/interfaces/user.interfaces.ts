import { z } from "zod";
import { userCreateSchema, userUpdateSchema } from "../schemas";
import { UserModel } from "../models";

type UserCreate = z.infer<typeof userCreateSchema>;
type GetAllUsers = Array<UserModel>;
type UserUpdate = z.infer<typeof userUpdateSchema>;

export { UserCreate, GetAllUsers, UserUpdate };
