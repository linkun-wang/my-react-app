import { createStore } from "redux";
import rootReducers from "../redux/reducers/index";

let store = createStore(rootReducers);

export default store;