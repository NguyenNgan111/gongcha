import express, { Application } from "express";
import { IRoute } from "@interfaces";
import cors from 'cors'
interface IExpressConfig {
  routes?: IRoute[];
}

export const expressConfig = (props: IExpressConfig = {}): Application => {
  const { routes = [] } = props;
  const app = express();
  app.use(cors({
    origin:"*"
  }))
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  routes.forEach((route) => {
    app.use(route.path, route.route);
  });



  return app;
};
