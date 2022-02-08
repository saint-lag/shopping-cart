const saveCartItems = () => {
  const cartItems = JSON.parse(localStorage.getItem('cartItems'));
  const orderedList = Array.from(document.querySelector('.cart__items').children);
  if (orderedList.length !== 0) {
    orderedList.forEach((el) => {
      cartItems[el.id] = el.innerText;
    });
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }
};

if (typeof module !== 'undefined') {
  module.exports = (saveCartItems);
}
