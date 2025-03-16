import { z } from "zod";
import { Optional } from "sequelize";
import { castCompleteReturnSchema, castCreateSchema, castReturnSchema } from "../schemas";

type CastCreate = z.infer<typeof castCreateSchema>;
type CastReturn = z.infer<typeof castReturnSchema>;
type CastCompleteReturn = z.infer<typeof castCompleteReturnSchema>;

interface CastAttributes {
  castId: string;
  actorId: string;
  movieId: string;
  addedDate: Date;
}

interface CastCreationAttributes extends Optional<CastAttributes, "castId" | "addedDate"> {}

export { CastCreate, CastReturn, CastAttributes, CastCreationAttributes, CastCompleteReturn };
