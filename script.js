function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  const button = createCustomElement(
    'button',
    'item__add',
    'Adicionar ao carrinho!',
  );
  button.id = `${sku}-btn`;
  section.className = 'item';
  section.id = sku;
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(button);

  return section;
}

async function createAllProductItemElements() {
  const itemsSection = document.querySelector('.items');
  const request = await fetchProducts('computador');
  const elements = [];
  request.results.forEach((product) => {
    const productObj = {
      sku: product.id,
      name: product.title,
      image: product.thumbnail,
    };
    elements.push(createProductItemElement(productObj));
  });
  elements.forEach((element) => itemsSection.appendChild(element));
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function loadingOn() {
  const loadingDiv = document.createElement('div');
  const loadingDivParent = document.querySelector('body');
  loadingDiv.style.fontSize = '1.75rem';
  loadingDiv.style.color = 'gray';
  loadingDiv.style.display = 'flex';
  loadingDiv.style.alignItems = 'center';
  loadingDiv.style.justifyContent = 'center';
  loadingDiv.style.height = '100px';
  loadingDiv.style.width = '200px';
  loadingDiv.style.position = 'absolute';
  loadingDiv.style.top = '50%';
  loadingDiv.style.left = '27.9%';
  loadingDiv.className = 'loading';
  loadingDiv.innerText = 'carregando...';
  loadingDivParent.appendChild(loadingDiv);
}

function loadingOff() {
  const loadingDiv = document.querySelector('.loading');
  const loadingDivParent = loadingDiv.parentElement;
  loadingDivParent.removeChild(loadingDiv);
}

async function totalPriceCalculator() {
  const cartItems = document.getElementsByClassName('cart__items')[0].children;
  const arr = [];
  Array.from(cartItems).forEach((item) =>
    arr.push(item.innerText.split('PRICE: $')[1]));
  const numberArr = arr.map((item) => Number(item));
  const reducer = (previous, current) => previous + current;
  const totalPrice = numberArr.reduce(reducer, 0);
  localStorage.setItem('totalPrice', JSON.stringify(totalPrice));
}

function setTotalPrice() {
  if (!document.querySelector('.total-price')) {
    const cartSection = document.querySelector('.cart');
    const totalPriceDiv = document.createElement('div');
    totalPriceDiv.className = 'total-price';
    cartSection.appendChild(totalPriceDiv);
  }
  if (!localStorage.getItem('totalPrice')) {
    localStorage.setItem('totalPrice', '0');
  } else {
    const totalPrice = localStorage.getItem('totalPrice');
    document.querySelector('.total-price').innerText = totalPrice === '0' ? '' : totalPrice;
  }
}

async function cartItemClickListener(event) {
  const cartItemsObj = JSON.parse(localStorage.getItem('cartItems'));
  const newCartItemsObj = cartItemsObj.filter(
    (value) => value !== event.target.innerText,
  );

  localStorage.setItem('cartItems', JSON.stringify(newCartItemsObj));

  event.target.remove();

  totalPriceCalculator();
  setTotalPrice();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

function createCartListener() {
  document.querySelectorAll('.item__add').forEach((button) => {
    button.addEventListener('click', async (event) => {
      const itemSku = getSkuFromProductItem(event.target.parentNode);
      const itemObj = await fetchItem(itemSku);
      const cartItems = document.querySelector('.cart__items');
      const cartItem = createCartItemElement({
        sku: itemSku,
        name: itemObj.title,
        salePrice: itemObj.price,
      });
      cartItems.appendChild(cartItem);
      totalPriceCalculator();
      setTotalPrice();
      saveCartItems();
    });
  });
}

function emptyCart() {
  const cartItemsObj = JSON.parse(localStorage.getItem('cartItems'));
  Array.from(document.querySelector('.cart__items').children).forEach(
    (item) => {
      delete cartItemsObj[item.id];
      item.parentElement.removeChild(item);
    },
  );
  localStorage.setItem('cartItems', JSON.stringify([]));
  localStorage.setItem('totalPrice', '0');
  setTotalPrice();
}

window.onload = async () => {
  getSavedCartItems();
  loadingOn();
  await createAllProductItemElements();
  loadingOff();
  setTotalPrice();
  createCartListener();
  document.querySelector('.empty-cart').addEventListener('click', emptyCart);
};
