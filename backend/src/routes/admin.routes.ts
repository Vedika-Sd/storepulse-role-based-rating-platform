import { Router } from "express";
import { requireAuth } from "../middleware/auth";
import { requireRole } from "../middleware/requireRole";
import { validate } from "../middleware/validate";
import {
  createUserSchema,
  createStoreSchema,
} from "../validators/admin.validator";
import {
  getDashboard,
  createUser,
  createStore,
  listUsers,
  listStores,
  getUserDetail,
} from "../controllers/admin.controller";

const router = Router();

router.use(requireAuth, requireRole("ADMIN")); // every route below requires an admin

router.get("/dashboard", getDashboard);
router.post("/users", validate(createUserSchema), createUser);
router.post("/stores", validate(createStoreSchema), createStore);
router.get("/users", listUsers);
router.get("/stores", listStores);
router.get("/users/:id", getUserDetail);

export default router;
