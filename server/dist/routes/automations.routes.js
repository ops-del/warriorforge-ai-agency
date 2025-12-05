"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const automations_controller_1 = require("../controllers/automations.controller");
const router = (0, express_1.Router)();
router.get("/", automations_controller_1.listAutomations);
router.get("/:id", automations_controller_1.getAutomation);
exports.default = router;
