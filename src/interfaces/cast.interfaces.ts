import { z } from "zod";
import { Optional } from "sequelize";
import { castCreateSchema, castReadSchema, CastReturnSchema } from "../schemas";

type CastCreate = z.infer<typeof castCreateSchema>;
type CastRead = z.infer<typeof castReadSchema>;
type CastReturn = z.infer<typeof CastReturnSchema>;

interface CastAttributes {
  castId: string;
  actorId: string;
  movieId: string;
  addedDate: Date;
}

interface CastCreationAttributes extends Optional<CastAttributes, "castId" | "addedDate"> {}

// type FavoriteCompleteRead = z.infer<typeof favoriteCompleteReadSchema>;
// type FavoriteCompleteReturn = z.infer<typeof favoriteCompleteReturnSchema>;

export { CastCreate, CastRead, CastReturn, CastAttributes, CastCreationAttributes };
