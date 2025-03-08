import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";

const isAdminOrOwner = (request: Request, response: Response, next: NextFunction): void => {
  const { admin, sub } = response.locals.decoded;
  const userId: string = request.params.userId;

  if (admin) return next();

  if (sub !== userId) throw new AppError("Insufficient permissions", 403);

  return next();
};

export default isAdminOrOwner;
