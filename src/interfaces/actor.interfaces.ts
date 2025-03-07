import { z } from "zod";
import { Optional } from "sequelize";
import { actorCreateSchema, actorReadSchema, actorReturnSchema } from "../schemas";

type ActorCreate = z.infer<typeof actorCreateSchema>;
type ActorRead = z.infer<typeof actorReadSchema>;
type ActorReturn = z.infer<typeof actorReturnSchema>;

interface ActorAttributes {
  actorId: string;
  name: string;
  birthDate: Date;
  nationality: string;
}

interface ActorCreationAttributes extends Optional<ActorAttributes, "actorId"> {}

export { ActorCreate, ActorRead, ActorReturn, ActorAttributes, ActorCreationAttributes };
