import { ActorCreate, ActorRead, ActorReturn, ActorUpdate } from "../interfaces";
import { actorReadSchema, actorReturnSchema } from "../schemas";
import { ActorModel } from "../models/Actor.model";

const getAllActors = async (): Promise<ActorRead> => {
  const actors: Array<ActorModel> = await ActorModel.findAll();

  return actorReadSchema.parse(actors);
};

const createActor = async (payLoad: ActorCreate): Promise<ActorReturn> => {
  const actor = await ActorModel.create(payLoad);

  return actorReturnSchema.parse(actor);
};

const updateActor = async (actor: ActorModel, payLoad: ActorUpdate): Promise<ActorReturn> => {
  Object.assign(actor, payLoad);
  await actor.save();

  return actorReturnSchema.parse(actor);
};

const deleteActor = async (actor: ActorModel): Promise<void> => {
  await actor!.destroy();
};

export default { getAllActors, createActor, deleteActor, updateActor };
