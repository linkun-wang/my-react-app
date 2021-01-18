import store from "./store";
import { addToCart } from "./actions/cart-action";

let unsubscribe = store.subscribe(() => {
  console.log(store.getState())
})

store.dispatch(addToCart('Coffee 500gm', 1, 250));
store.dispatch(addToCart('Flour 1kg', 2, 110));
store.dispatch(addToCart('Juice 2L', 1, 250));

unsubscribe();