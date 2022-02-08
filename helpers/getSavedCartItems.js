// TODO: Import real Function from script.js
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

const getSavedCartItems = () => {
  if (localStorage.getItem('cartItems')) {
    const cartItems = JSON.parse(localStorage.getItem('cartItems'));
    if (Object.entries(cartItems).length > 0) {
      const cartItemOrderedList = document.querySelector('.cart__items');
      Object.entries(cartItems).forEach((entry) => {
        const cartItemElement = document.createElement('li');
        const [id, text] = entry;
        const itemId = document.querySelector(`#${id.split('-')[0]}`);
        cartItemElement.id = id;
        cartItemElement.innerText = text;
        cartItemElement.addEventListener('click', cartItemClickListener);
        cartItemOrderedList.appendChild(cartItemElement);
        disableBtn(itemId.lastChild);
      });
    }
  } else {
    localStorage.setItem('cartItems', '{}');
  }
};

if (typeof module !== 'undefined') {
  module.exports = (disableBtn, enableBtn, getSavedCartItems);
}
