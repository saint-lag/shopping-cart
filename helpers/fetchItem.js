const fetch = require('node-fetch');

const fetchItem = async () => {
  const url = 'https://api.mercadolibre.com/sites/MLB/search?q=$computador';
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data.results);
    return data.results;
  } catch (err) {
    console.log(`Error: ${err}`);
  }
};

// const results = async () => {
  // const require = await fetchItem();
  // console.log(require);
// };

// results();

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
