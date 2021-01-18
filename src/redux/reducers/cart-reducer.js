import { ADD_TO_CART } from "../actions/cart-action";

const initialState = {
  cart: [
    {
      product: 'bread 700g',
      quantity: 2,
      unitCost: 90
    },
    {
      product: 'milk 500ml',
      quantity: 1,
      unitCost: 47
    }
  ]
};

/**
 * 
 * @param {*} state 状态
 * @param {*} action 一个容器: type--一个简单的字符串常量，如ADD, UPDATE, DELETE等；payload--用于更新状态的数据
 */
export default function (state=initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cart: [...state.cart, ...action.payload]
      }
  
    default:
      return state
  }
}