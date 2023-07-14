import { Router } from "express";
import { userMiddleware } from "../middlewares/auth.middleware";
import {
  createCart,
  addCart,
  getCart,
  deleteCart,
  updateCart,
} from "@controllers";
export const cartRouter = Router();
cartRouter.get("/", userMiddleware, getCart);
cartRouter.post("/", userMiddleware, addCart);
cartRouter.put("/", userMiddleware, updateCart);
cartRouter.delete("/", userMiddleware, deleteCart);
