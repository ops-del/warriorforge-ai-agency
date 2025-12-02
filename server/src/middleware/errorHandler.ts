import { NextFunction, Request, Response } from "express";
import { Prisma } from "@prisma/client";
import { AppError } from "../utils/AppError";

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  const isPrismaError = err instanceof Prisma.PrismaClientKnownRequestError;
  const statusCode =
    err instanceof AppError ? err.statusCode : isPrismaError ? 400 : 500;
  const message = err.message || "Something went wrong";

  console.error(err);

  res.status(statusCode).json({ error: message });
}
