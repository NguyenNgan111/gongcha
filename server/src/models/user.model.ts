import { Schema, Types, model } from "mongoose";
// 1. Create an interface representing a document in MongoDB.
enum ROLE {
  admin = "admin",
  user = "user",
}
interface IDetailOrder {
  idProduct: string;
  quantityProduct: number;
  price: string;
}
interface IOrderItem {
  orderNumber: string;
  date: string;
  totalPrice: string;
  detailOrder: IDetailOrder[];
}
interface IUser {
  phone: string;
  pwd: string;
  role: ROLE;
  order: IOrderItem[];
}

// 2. Create a Schema corresponding to the document interface.

const userSchema = new Schema<IUser>({
  phone: { type: String, required: true },
  pwd: { type: String, required: true },
  role: {
    type: String,
    enum: [ROLE.user, ROLE.admin],
    default: ROLE.user,
    require: false,
  },
  order: [{ type: Object, required: false }],
});

// 3. Create a Model.
export const User = model<IUser>("User", userSchema);
