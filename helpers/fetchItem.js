const fetchItem = async (itemID) => {
  try {
    const url = `https://api.mercadolibre.com/items/${itemID}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (err) {
    return new Error(err.message);
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
