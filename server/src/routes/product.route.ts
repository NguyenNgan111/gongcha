import { Router } from "express";

import {
  createProduct,
  getProductById,
  getProducts,
  updateProduct,
  deleteProduct,
  addViews,
} from "@controllers";
import { authMiddleware } from "@middlewares";

export const productRouter = Router();

productRouter.get("/", getProducts, addViews);

productRouter.get("/admin", authMiddleware, getProducts);

productRouter.post("/", authMiddleware, createProduct);

productRouter.get("/:id", getProductById);

productRouter.put("/:id", authMiddleware, updateProduct);

productRouter.delete("/", authMiddleware, deleteProduct);
