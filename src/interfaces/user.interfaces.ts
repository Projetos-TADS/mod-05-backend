import { z } from "zod";
import { userCreateSchema, userReadSchema, userReturnSchema } from "../schemas";

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

type UserCreate = z.infer<typeof userCreateSchema>;
type UserUpdate = DeepPartial<UserCreate>;
type UserRead = z.infer<typeof userReadSchema>;
type UserReturn = z.infer<typeof userReturnSchema>;

export { UserCreate, UserUpdate, UserRead, UserReturn };
