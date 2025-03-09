import { Request, Response } from "express";
import { SessionReturn } from "../interfaces";
import { sessionServices } from "../services";

const createSession = async (request: Request, response: Response): Promise<Response> => {
  const token: SessionReturn = await sessionServices.createSession(request.body);
  return response.status(201).json(token);
};

export default { createSession };
