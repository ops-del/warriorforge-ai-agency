"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminAuth = adminAuth;
const env_1 = require("../config/env");
const AppError_1 = require("../utils/AppError");
function adminAuth(req, _res, next) {
    const token = req.header("x-admin-token");
    if (!token || token !== env_1.env.ADMIN_PASSWORD) {
        return next(new AppError_1.AppError("Unauthorized", 401));
    }
    return next();
}
