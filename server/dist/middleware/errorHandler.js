"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
const client_1 = require("@prisma/client");
const AppError_1 = require("../utils/AppError");
function errorHandler(err, _req, res, _next) {
    const isPrismaError = err instanceof client_1.Prisma.PrismaClientKnownRequestError;
    const statusCode = err instanceof AppError_1.AppError ? err.statusCode : isPrismaError ? 400 : 500;
    const message = err.message || "Something went wrong";
    console.error(err);
    res.status(statusCode).json({ error: message });
}
