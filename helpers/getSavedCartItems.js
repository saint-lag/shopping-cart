// TODO: Import real function from script.js
function cartItemClickListener() {
  return true;
}

const disableBtn = (btn, id) => {
  if (!id) {
    const btnId = document.querySelector(`#${btn.id}`);
    btnId.disabled = true;
    btnId.style.backgroundColor = 'gray';
    btnId.innerText = 'Item adicionado!';
  } else {
    const btnId = document.querySelector(`#${id}`);
    btnId.disabled = true;
    btnId.style.backgroundColor = 'gray';
    btnId.innerText = 'Item adicionado!';
  }
};

const enableBtn = (btn, id) => {
  if (!id) {
    const btnId = document.querySelector(`#${btn.id}`);
    btnId.disabled = false;
    btnId.style.backgroundColor = 'rgb(5, 52, 219)';
    btnId.innerText = 'Adicionar ao carrinho!';
  } else {
    const btnId = document.querySelector(`#${id}`);
    console.log(btnId);
    btnId.disabled = false;
    btnId.style.backgroundColor = 'rgb(5, 52, 219)';
    btnId.innerText = 'Adicionar ao carrinho!';
  }
};

const getSavedCartItems = async () => {
  if (localStorage.getItem('cartItems')) {
    const cartItems = JSON.parse(localStorage.getItem('cartItems'));
    if (Object.entries(cartItems).length > 0) {
      const cartItemOrderedList = document.querySelector('.cart__items');
      Object.entries(cartItems).forEach(async (entry) => {
        const cartItemElement = document.createElement('li');
        const [id, text] = entry;
        cartItemElement.className = 'cart__item';
        cartItemElement.id = id;
        cartItemElement.innerText = text;
        cartItemElement.addEventListener('click', cartItemClickListener);
        cartItemOrderedList.appendChild(cartItemElement);
      });
    }
  } else {
    localStorage.setItem('cartItems', '{}');
  }
};

if (typeof module !== 'undefined') {
  module.exports = (disableBtn, enableBtn, getSavedCartItems);
}
