import React from 'react';
import Img from 'gatsby-image';
import MenuItemStyles from '../styles/MenuItemStyles';
import calculatePrice from '../utils/calculatePrice';
import formatMoney from '../utils/formatMoney';

export default function PizzaOrder({ order, pizzas, removeFromOrder }) {
  return (
    <>
      {order.map((singleItem, index) => {
        const pizza = pizzas.find((pizza) => pizza.id === singleItem.id);
        return (
          <MenuItemStyles key={`${singleItem.id}-${index}`}>
            <Img fluid={pizza.image.asset.fluid} />
            <h2>{pizza.name}</h2>
            <p>
              {singleItem.size} -
              {formatMoney(calculatePrice(pizza.price, singleItem.size))}
              <button
                type="button"
                className="remove"
                title={`Remove ${singleItem.size} ${pizza.name} from order`}
                onClick={() => removeFromOrder(index)}
              >
                &times;
              </button>
            </p>
          </MenuItemStyles>
        );
      })}
    </>
  );
}
