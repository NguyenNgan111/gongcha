import { Router } from "express";

import { createDashboard, getDashboard } from "@controllers";
import { authMiddleware } from "@middlewares";

export const dashboardRouter = Router();
dashboardRouter.get("/", authMiddleware, getDashboard);
