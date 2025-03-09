import { z } from "zod";
import { Optional } from "sequelize";
import { castCreateSchema, castReturnSchema } from "../schemas";

type CastCreate = z.infer<typeof castCreateSchema>;
type CastReturn = z.infer<typeof castReturnSchema>;

interface CastAttributes {
  castId: string;
  actorId: string;
  movieId: string;
  addedDate: Date;
}

interface CastCreationAttributes extends Optional<CastAttributes, "castId" | "addedDate"> {}

export { CastCreate, CastReturn, CastAttributes, CastCreationAttributes };
