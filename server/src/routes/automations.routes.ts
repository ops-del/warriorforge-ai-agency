import { Router } from "express";
import {
  getAutomation,
  listAutomations,
} from "../controllers/automations.controller";

const router = Router();

router.get("/", listAutomations);
router.get("/:id", getAutomation);

export default router;
