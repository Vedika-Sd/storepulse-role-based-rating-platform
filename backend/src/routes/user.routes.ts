import { Router } from "express";
import { requireAuth } from "../middleware/auth";
import { requireRole } from "../middleware/requireRole";
import { validate } from "../middleware/validate";
import {
  submitRatingSchema,
  changePasswordSchema,
} from "../validators/rating.validator";
import {
  browseStores,
  submitRating,
  changePassword,
} from "../controllers/user.controller";

const router = Router();

router.use(requireAuth, requireRole("NORMAL_USER"));

router.get("/stores", browseStores);
router.post("/ratings", validate(submitRatingSchema), submitRating);
router.put("/change-password", validate(changePasswordSchema), changePassword);

export default router;
