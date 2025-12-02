import { Router } from "express";
import {
  handleCreateDemoLead,
  handleGetDemoLead,
  handleListDemoLeads,
} from "../controllers/demoLeads.controller";
import { adminAuth } from "../middleware/adminAuth";

const demoLeadsRouter = Router();
demoLeadsRouter.post("/", handleCreateDemoLead);

const adminDemoLeadsRouter = Router();
adminDemoLeadsRouter.use(adminAuth);
adminDemoLeadsRouter.get("/", handleListDemoLeads);
adminDemoLeadsRouter.get("/:id", handleGetDemoLead);

export { demoLeadsRouter, adminDemoLeadsRouter };
