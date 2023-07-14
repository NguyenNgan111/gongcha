import { expressConfig, mongoConfig } from "./config";
import dotenv from "dotenv";
import { productRouter } from "./routes";
import { routes } from "@constants";

(async () => {
  dotenv.config();
  const app = expressConfig({
    routes: routes,
  });
  await mongoConfig();
  const PORT = process.env.PORT || 8080;

  app.listen(PORT, () => console.log("Server Running on Port " + PORT));
})();
