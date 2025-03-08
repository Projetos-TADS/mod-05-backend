import { DirectorCreate, DirectorRead, DirectorReturn, DirectorUpdate } from "../interfaces";
import { DirectorModel } from "../models/Director.model";
import { directorReadSchema, directorReturnSchema } from "../schemas";

const getAllDirectors = async (): Promise<DirectorRead> => {
  const directors: Array<DirectorModel> = await DirectorModel.findAll();

  return directorReadSchema.parse(directors);
};

const createDirector = async (payLoad: DirectorCreate): Promise<DirectorReturn> => {
  const director = await DirectorModel.create(payLoad);

  return directorReturnSchema.parse(director);
};

const updateDirector = async (
  director: DirectorModel,
  payLoad: DirectorUpdate
): Promise<DirectorReturn> => {
  Object.assign(director, payLoad);
  await director.save();

  return directorReturnSchema.parse(director);
};

const deleteDirector = async (director: DirectorModel): Promise<void> => {
  await director!.destroy();
};

export default { getAllDirectors, createDirector, deleteDirector, updateDirector };
