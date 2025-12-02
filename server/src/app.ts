import cors from "cors";
import express from "express";
import { env } from "./config/env";
import automationsRouter from "./routes/automations.routes";
import ordersRouter from "./routes/orders.routes";
import adminRouter from "./routes/admin.routes";
import payRouter from "./routes/pay.routes";
import demoLeadsRouter from "./routes/demoLeads.routes";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

app.use(
  cors({
    origin: env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/automations", automationsRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/admin", adminRouter);
app.use("/api/pay", payRouter);
app.use("/api/demo-leads", demoLeadsRouter);

app.use(errorHandler);

export default app;
