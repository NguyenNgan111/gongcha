import { Collection, Schema, Types, model } from "mongoose";
import { Product } from "./product.model";
import { User } from "./user.model";
// 1. Create an interface representing a document in MongoDB.
export interface ICartItem {
  // _id: string;
  idProduct: string;
  quantity: number;
  size: string;
}
interface ICart {
  idUser: string;
  cartList: ICartItem[];
}
// 2. Create a Schema corresponding to the document interface.

const cartSchema = new Schema<ICart>({
  idUser: { type: String, ref: User },
  cartList: [
    {
      type: {
        idProduct: { type: String, ref: Product, require: true },
        quantity: { type: Number, require: true },
        size: { type: String, require: true },
      },
    },
  ],
});
// 3. Create a Model.
export const Cart = model<ICart>("Cart", cartSchema);
