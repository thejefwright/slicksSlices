import calculatePrice from './calculatePrice';

export default function calculateOrderTotal(order, pizzas) {
  return order.reduce((runningTotal, singleItem) => {
    const pizza = pizzas.find((pizza) => pizza.id === singleItem.id);
    return runningTotal + calculatePrice(pizza.price, singleItem.size);
  }, 0);
}
