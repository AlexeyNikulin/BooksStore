import React from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import './shop-header.css';

const ShopHeader = ({count, total }) => {
  return (
    <header className="shop-header row">
      <Link to="/">
        <div className="logo text-dark">ReStore</div>
      </Link>
      <Link to="/cart">
        <div className="shopping-cart">
          <i className="cart-icon fa fa-shopping-cart" />
          {count} products (${total})
        </div>
      </Link>
    </header>
  );
};

const mapStateToProps = ({shoppingCart: {cartItems, orderTotal}}) => {
  return {
    count: cartItems.length,
    total: orderTotal
  }
}

export default connect(mapStateToProps)(ShopHeader);
