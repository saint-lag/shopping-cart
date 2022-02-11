const saveCartItems = (item) => {
  if (!item) {
    const cartItems = [];
    const orderedList = Array.from(
      document.querySelector('.cart__items').children,
    );
    if (orderedList.length !== 0) {
      orderedList.forEach((el) => {
        cartItems.push(el.innerText);
      });
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
  } else {
    localStorage.setItem('cartItems', item);
  }
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
