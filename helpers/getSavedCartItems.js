const getSavedCartItems = () => {
  if (!localStorage.getItem('cartItems')) {
    localStorage.setItem('cartItems', '[]');
    return 0;
  } 
  const cartItems = JSON.parse(localStorage.getItem('cartItems'));
  if (cartItems.length !== 0) {
    const cartItemOrderedList = document.querySelector('.cart__items');
    const cartItemElement = document.createElement('li');
    cartItems.forEach((item) => {
      cartItemElement.innerHTML = item;
      cartItemOrderedList.appendChild(cartItemElement);
    });
  }
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
