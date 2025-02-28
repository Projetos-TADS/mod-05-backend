import { z } from "zod";
import { userCreateSchema } from "../schemas";
import { UserModel } from "../models";

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

type UserCreate = z.infer<typeof userCreateSchema>;
type GetAllUsers = Array<UserModel>;
type UserUpdate = DeepPartial<UserCreate>;

export { UserCreate, GetAllUsers, UserUpdate };
