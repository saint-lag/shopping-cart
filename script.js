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

function cartItemClickListener(event) {
  const itemSku = event.target.id.split('-')[0];
  const btn = document.getElementById(itemSku).lastChild;
  console.log(btn);
  btn.disabled = false;
  btn.style.backgroundColor = 'rgb(5, 52, 219)';
  btn.innerText = 'Adicionar ao carrinho!';
  event.target.remove();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.id = `${sku}-cartItem`;
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: ${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

function loadingOn() {
  const loadingDiv = document.createElement('div');
  const loadingDivParent = document.querySelector('body');
  loadingDiv.style.color = 'white';
  loadingDiv.style.backgroundColor = 'rgb(5, 52, 219)';
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

function createCartListener() {
  document.querySelectorAll('.item__add').forEach((button) => {
    button.addEventListener('click', async (event) => {
      const btn = document.getElementById(event.target.id);
      const itemSku = getSkuFromProductItem(event.target.parentNode);
      const itemObj = await fetchItem(itemSku);
      const cartItem = createCartItemElement({
        sku: itemSku,
        name: itemObj.title,
        salePrice: itemObj.price,
      });
      const cartItems = document.querySelector('.cart__items');
      cartItems.appendChild(cartItem);
      saveCartItems();
      btn.disabled = true;
      btn.style.backgroundColor = 'gray';
      btn.innerText = 'Item adicionado!';
    });
  });
}

window.onload = async () => {
  loadingOn();
  getSavedCartItems();
  await createAllProductItemElements();
  loadingOff();
  createCartListener();
};