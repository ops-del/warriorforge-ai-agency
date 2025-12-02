import { Router } from "express";
import {
  adminCreateAutomation,
  adminDeleteAutomation,
  adminListAutomations,
  adminLogin,
  adminUpdateAutomation,
  getAdminOrder,
  listAdminOrders,
} from "../controllers/admin.controller";
import { adminAuth } from "../middleware/adminAuth";

const router = Router();

router.post("/login", adminLogin);

router.use(adminAuth);

router.get("/automations", adminListAutomations);
router.post("/automations", adminCreateAutomation);
router.put("/automations/:id", adminUpdateAutomation);
router.delete("/automations/:id", adminDeleteAutomation);

router.get("/orders", listAdminOrders);
router.get("/orders/:id", getAdminOrder);

export default router;
