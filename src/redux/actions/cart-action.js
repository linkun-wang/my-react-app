export const ADD_TO_CART = 'ADD_TO_CART';

/**
 * 定义一个action，作为store.dispatch()的一个参数
 * @param {*} product 
 * @param {*} quantity 
 * @param {*} unitCost 
 */
export function addToCart(product, quantity, unitCost) {
  return {
    type: ADD_TO_CART,
    playLoad: {
      product,
      quantity,
      unitCost
    }
  }
}