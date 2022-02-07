const getSavedCartItems = () => {
  if (localStorage.getItem('cartItems')) {
    const cartItems = JSON.parse(localStorage.getItem('cartItems'));
    if (Object.entries(cartItems).length > 0) {
      const cartItemOrderedList = document.querySelector('.cart__items');
      Object.entries(cartItems).forEach((entry) => {
        const cartItemElement = document.createElement('li');
        const [id, text] = entry;
        cartItemElement.id = id;
        cartItemElement.innerText = text;
        cartItemOrderedList.appendChild(cartItemElement);
      });
    }
  } else {
    localStorage.setItem('cartItems', '{}');
  }
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
