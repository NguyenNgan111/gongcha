import { Schema, model } from "mongoose";

// 1. Create an interface representing a document in MongoDB.
interface IProduct {
  name: string;
  description: string;
  discount: string;
  type: [{ size: string; price: string }];
  url: string;
  category: string;
  year: string;
  bought: number;
}

// 2. Create a Schema corresponding to the document interface.
const productSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  description: { type: String, required: false },
  discount: { type: String, required: false },
  type: { type: [{ size: String, price: String }], required: true },
  url: { type: String, required: true },
  category: { type: String, required: true },
  year: { type: String, required: true },
  bought: { type: Number, required: true },
});

// 3. Create a Model.
export const Product = model<IProduct>("Product", productSchema);
