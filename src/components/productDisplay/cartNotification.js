import React from 'react';
import './styles.css';

const CartNotification = ({
  currentItemLabel,
  selectedItemCount
}) => (<div className="cartNotification">
    <span className="cartNotificationSpan">Number of {currentItemLabel} added to cart: {selectedItemCount}</span>
  </div>);

export default CartNotification;
