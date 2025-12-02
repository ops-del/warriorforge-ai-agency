import { NextFunction, Request, Response } from "express";
import { env } from "../config/env";
import { AppError } from "../utils/AppError";

export function adminAuth(req: Request, _res: Response, next: NextFunction) {
  const token = req.header("x-admin-token");

  if (!token || token !== env.ADMIN_PASSWORD) {
    return next(new AppError("Unauthorized", 401));
  }

  return next();
}
