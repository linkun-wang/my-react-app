import { combineReducers } from "redux";
import cartReducer from "./cart-reducer";
import productsReducer from "./product-reducer";

const allReducers = {
  products: productsReducer,
  shoppingCart: cartReducer
};

const rootReducers = combineReducers(allReducers);

export default rootReducers;