import { productRouter } from "@routes";
import { userRouter } from "@routes";
import { adminRouter } from "@routes";
import { cartRouter } from "@routes";
import { dashboardRouter } from "@routes";
export enum Route {
  PRODUCT = "/products",
  VOUCHER = "/vouchers",
  USER = "/user",
  ADMIN = "/admin",
  CART = "/cart",
  DASHBOARD = "/dashboard",
}

export const routes = [
  {
    path: Route.CART,
    route: cartRouter,
  },
  {
    path: Route.PRODUCT,
    route: productRouter,
  },
  {
    path: Route.VOUCHER,
    route: productRouter,
  },
  {
    path: Route.USER,
    route: userRouter,
  },
  {
    path: Route.ADMIN,
    route: adminRouter,
  },
  {
    path: Route.DASHBOARD,
    route: dashboardRouter,
  },
];
