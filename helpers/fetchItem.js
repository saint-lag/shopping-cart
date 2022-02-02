// const fetch = require('node-fetch');

const fetchItem = async (query) => {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
  try {
    const response = await fetch(url);
    return response.json();
    // const data = await response.json();
    // return data;
  } catch (err) {
    console.log(`Error: ${err}`);
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
