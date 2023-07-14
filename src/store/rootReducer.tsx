import { combineReducers } from "redux";
import ProductReducer from "./products/productsReducer";
import UserReducer from "./user/login/loginReducer";
import cartReducer from "./cart/cartReducer";
const rootReducer = combineReducers({
  products: ProductReducer,
  user: UserReducer,
  cart: cartReducer,
});

export default rootReducer;
