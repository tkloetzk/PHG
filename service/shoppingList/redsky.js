const redsky = "https://redsky.target.com/v1";
const store_id = "1144";

export const fetchItemTCIN = async item => {
  try {
    let response = await fetch(
      `${redsky}/plp/search?keyword=${item}&store_ids=${store_id}`
    );
    let responseJson = await response.json();
    if (
      responseJson.search_response &&
      responseJson.search_response.items &&
      responseJson.search_response.items.Item.length
    ) {
      const tcin = responseJson.search_response.items.Item[0].tcin;
      return tcin;
    }
    return null;
  } catch (err) {
    console.error(err);
  }
};

export const fetchTCINAisle = async tcin => {
  try {
    const aisleResponse = await fetch(
      `${redsky}/location_details/${tcin}?storeId=${store_id}`
    );
    const aisleJSON = await aisleResponse.json();
    return aisleJSON.product.in_store_location.block_aisle;
  } catch (err) {
    console.error(err);
  }
};
