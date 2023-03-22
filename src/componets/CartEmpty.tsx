import React from "react";
import { Link } from "react-router-dom";
import CartEmpty from "../assets/img/empty-cart.png";

export const сartEmpty: React.FC = () => {
  return (
    <>
      <div className="cart cart--empty">
        <h2>Корзина пуста </h2>
        <p>
          Вероятнее всего, вы не заказали еще пиццу.
          <br /> Для того, чтобы заказать пиццу, перейдите на главную страницу.
        </p>
        <img src={CartEmpty} alt="Empty-cart" />
        <Link to="/" className="button button--black">
          <span>Вернуться назад</span>
        </Link>
      </div>
    </>
  );
};

export default сartEmpty;
