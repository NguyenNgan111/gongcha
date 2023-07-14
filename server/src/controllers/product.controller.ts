import { Product } from "@models";
import { RequestHandler } from "express";
export const getProducts: RequestHandler = async (req, res, next) => {
  const found = await Product.find();
  res.send(found);
  next();
};

export const createProduct: RequestHandler = async (req, res) => {
  console.log("Start create product", req.body);
  const newProduct = new Product(req.body);
  const saved = await newProduct.save();
  // console.log("finish: ", saved);
  res.send(newProduct);
};

export const getProductById: RequestHandler = async (req, res) => {
  const id = req.params.id;
  try {
    const item = await Product.findOne({ _id: id });
    // console.log("hehe", item);
    res.send(item);
  } catch {
    res.sendStatus(404);
  }
};

export const updateProduct: RequestHandler = async (req, res) => {
  const id = req.params.id;
  const newProduct = { ...req.body };
  try {
    let update = await Product.findOneAndUpdate({ _id: id }, { ...newProduct });
    res.sendStatus(200);
  } catch {
    res.sendStatus(400);
  }
};
export const deleteProduct: RequestHandler = async (req, res) => {
  const id = req.body.idProduct;
  console.log("id ne: ", id);
  try {
    let del = await Product.findOneAndDelete({ _id: id });
    res.sendStatus(200);
  } catch {
    res.sendStatus(400);
  }
};
