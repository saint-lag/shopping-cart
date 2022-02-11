// TODO: Import real function from script.js
function cartItemClickListener() {
  return true;
}

const getSavedCartItems = () => {
  if (localStorage.getItem('cartItems')) {
    const cartItems = JSON.parse(localStorage.getItem('cartItems'));
    if (cartItems.length > 0) {
      const cartItemOrderedList = document.querySelector('.cart__items');
      cartItems.forEach((value) => {
        const cartItemElement = document.createElement('li');
        cartItemElement.className = 'cart__item';
        cartItemElement.innerText = value;
        cartItemElement.addEventListener('click', cartItemClickListener);
        cartItemOrderedList.appendChild(cartItemElement);
      });
    }
  } else {
    localStorage.setItem('cartItems', '[]');
  }
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
