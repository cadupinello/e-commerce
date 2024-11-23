import { useState, useEffect } from 'react';

const CART_STORAGE_KEY = 'cart';

function getSavedCartData() {
  const savedData = localStorage.getItem(CART_STORAGE_KEY);
  return savedData ? JSON.parse(savedData) : [];
}

function saveCartData(cartData) {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartData));
}

export function useCart() {
  const [cartData, setCartData] = useState(getSavedCartData());

  useEffect(() => {
    saveCartData(cartData);
  }, [cartData]);

  function addItemToCart(item) {
    setCartData([...cartData, item]);
  }

  function removeItemFromCart(itemId) {
    console.log(itemId);
    const removeItem = cartData.filter((item) => item._id !== itemId);
    setCartData(removeItem);
  }

  function clearCart() {
    setCartData([]);
  }

  return {
    cartData,
    addItemToCart,
    removeItemFromCart,
    clearCart,
  };
}
