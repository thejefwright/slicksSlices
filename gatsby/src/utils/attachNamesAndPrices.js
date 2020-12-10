import calculatePrice from './calculatePrice';
import formatMoney from './formatMoney';

export default function attchNamesAndPrices(order, pizzas) {
  return order.map((item) => {
    const pizza = pizzas.find((pizza) => pizza.id === item.id);
    return {
      ...item,
      name: pizza.name,
      thumbnail: pizza.image.asset.fluid.src,
      price: formatMoney(calculatePrice(pizza.price, item.size)),
    };
  });
}
