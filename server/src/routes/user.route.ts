import { Router } from "express";
import {
  regist,
  getUser,
  login,
  addOrder,
  updatePwdUser,
  getOrder,
} from "@controllers";
import { authMiddleware, userMiddleware } from "@middlewares";
export const userRouter = Router();
userRouter.get("/", authMiddleware, getUser);
userRouter.put("/", userMiddleware, updatePwdUser);
userRouter.post("/login", login);
userRouter.post("/regist", regist);
userRouter.post("/order", userMiddleware, addOrder);
userRouter.get("/order", userMiddleware, getOrder);
