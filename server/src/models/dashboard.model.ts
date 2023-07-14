import { Collection, Schema, Types, model } from "mongoose";
import { User } from "./user.model";
// 1. Create an interface representing a document in MongoDB.
interface IDashboard {
  views: number;
}
// 2. Create a Schema corresponding to the document interface.

const dashboardSchema = new Schema<IDashboard>({
  views: { type: Number },
});
// 3. Create a Model.
export const Dashboard = model<IDashboard>("Dashboard", dashboardSchema);
