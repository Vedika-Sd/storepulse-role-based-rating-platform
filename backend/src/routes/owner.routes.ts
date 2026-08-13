import { Router } from "express";
import { requireAuth } from "../middleware/auth";
import { requireRole } from "../middleware/requireRole";
import { getOwnerDashboard } from "../controllers/owner.controller";

const router = Router();

router.use(requireAuth, requireRole("STORE_OWNER"));

router.get("/dashboard", getOwnerDashboard);

export default router;
