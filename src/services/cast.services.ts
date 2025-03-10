import { CastModel, MovieModel } from "../models";
import { ActorModel } from "../models/Actor.model";
import { CastReturn } from "../interfaces";
import { castReturnSchema } from "../schemas";
import { AppError } from "../errors";

const addActorToMovie = async (movie: MovieModel, actor: ActorModel): Promise<CastReturn> => {
  const castPayload = { movieId: movie.movieId, actorId: actor.actorId };
  const [cast, created] = await CastModel.findOrCreate({
    where: castPayload,
    defaults: castPayload,
  });

  if (!created) throw new AppError("Actor already edded");

  return castReturnSchema.parse(cast);
};

const removeActorFromMovie = async (cast: CastModel): Promise<void> => {
  await cast!.destroy();
};

export default { addActorToMovie, removeActorFromMovie };
