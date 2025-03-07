import { Request, Response } from "express";
import { actorReturnSchema } from "../schemas";
import { ActorReturn, ActorUpdate } from "../interfaces";
import { ActorModel } from "../models/Actor.model";
import actorServices from "../services/actor.services";

const getAllActors = async (request: Request, response: Response): Promise<Response> => {
  const actors = await actorServices.getAllActors();

  return response.status(200).json(actors);
};

const getActorById = async (request: Request, response: Response): Promise<Response> => {
  return response.status(200).json(actorReturnSchema.parse(response.locals.actor));
};

const createActor = async (request: Request, response: Response): Promise<Response> => {
  const actor: ActorReturn = await actorServices.createActor(request.body);

  return response.status(201).json(actor);
};

const updateActor = async (request: Request, response: Response): Promise<Response> => {
  const payLoad: ActorUpdate = request.body;
  const foundActor: ActorModel = response.locals.actor;

  const user: ActorReturn = await actorServices.updateActor(foundActor, payLoad);

  return response.status(200).json(user);
};

const deleteActor = async (request: Request, response: Response): Promise<Response> => {
  await actorServices.deleteActor(response.locals.actor);

  return response.status(204).json();
};

export default {
  getAllActors,
  getActorById,
  createActor,
  deleteActor,
  updateActor,
};
