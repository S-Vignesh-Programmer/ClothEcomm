import express from "express";
import {
  addToCart,
  getCart,
  removeFromCart,
} from "../controllers/cartController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);
router.get("/", getCart);
router.post("/add", addToCart);
router.post("/remove", removeFromCart);

export default router;
