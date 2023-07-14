import { Router } from "express";

import { loginAdmin, checkToken, updateRoleUser, getUser } from "@controllers";
import { authMiddleware } from "@middlewares";

export const adminRouter = Router();
adminRouter.get("/", authMiddleware, getUser);
adminRouter.get("/token", checkToken);
adminRouter.post("/login", loginAdmin);
adminRouter.put("/user", authMiddleware, updateRoleUser);
