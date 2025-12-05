"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const env_1 = require("./config/env");
const automations_routes_1 = __importDefault(require("./routes/automations.routes"));
const orders_routes_1 = __importDefault(require("./routes/orders.routes"));
const admin_routes_1 = __importDefault(require("./routes/admin.routes"));
const pay_routes_1 = __importDefault(require("./routes/pay.routes"));
const demoLeads_routes_1 = __importDefault(require("./routes/demoLeads.routes"));
const errorHandler_1 = require("./middleware/errorHandler");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: env_1.env.CORS_ORIGIN,
    credentials: true,
}));
app.use(express_1.default.json());
app.get("/api/health", (_req, res) => {
    res.json({ status: "ok" });
});
app.use("/api/automations", automations_routes_1.default);
app.use("/api/orders", orders_routes_1.default);
app.use("/api/admin", admin_routes_1.default);
app.use("/api/pay", pay_routes_1.default);
app.use("/api/demo-leads", demoLeads_routes_1.default);
app.use(errorHandler_1.errorHandler);
exports.default = app;
