const redsky = 'https://redsky.target.com/v1';
const storeId = '1144';

export const fetchItemTCIN = async (item) => {
  try {
    const response = await fetch(`${redsky}/plp/search?keyword=${item}&store_ids=${storeId}`);
    const responseJson = await response.json();
    if (
      responseJson.search_response
      && responseJson.search_response.items
      && responseJson.search_response.items.Item.length
    ) {
      return responseJson.search_response.items.Item[0].tcin;
    }
    return null;
  } catch (err) {
    //   console.error(err);
  }
  return null;
};

export const fetchTCINAisle = async (tcin) => {
  try {
    const aisleResponse = await fetch(`${redsky}/location_details/${tcin}?storeId=${storeId}`);
    const aisleJSON = await aisleResponse.json();
    return aisleJSON.product.in_store_location.block_aisle;
  } catch (err) {
    //  console.error(err);
  }
  return null;
};
