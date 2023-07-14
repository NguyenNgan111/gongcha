import mongoose from "mongoose";

export const mongoConfig = async () => {
  const uri = process.env.MONGO_URI || "";
  const dbName = process.env.MONGO_DB_NAME || "";
  mongoose.connect(uri, {
    dbName,
  });

  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.on("open", () => console.log(`Connected to MongoDB`));
};
