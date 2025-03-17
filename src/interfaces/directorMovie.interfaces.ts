import { z } from "zod";
import { Optional } from "sequelize";
import {
  directorMovieCompleteReturnSchema,
  directorMovieCreateSchema,
  directorMovieReturnSchema,
} from "../schemas";

type DirectorMovieCreate = z.infer<typeof directorMovieCreateSchema>;
type DirectorMovieReturn = z.infer<typeof directorMovieReturnSchema>;
type DirectorMovieCompleteReturn = z.infer<typeof directorMovieCompleteReturnSchema>;

interface DirectorMovieAttributes {
  directorMovieId: string;
  directorId: string;
  movieId: string;
  addedDate: Date;
}

interface DirectorMovieCreationAttributes
  extends Optional<DirectorMovieAttributes, "directorMovieId" | "addedDate"> {}

export {
  DirectorMovieCreate,
  DirectorMovieReturn,
  DirectorMovieAttributes,
  DirectorMovieCreationAttributes,
  DirectorMovieCompleteReturn,
};
