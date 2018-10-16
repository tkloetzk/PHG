import { AsyncStorage } from 'react-native';

class ShoppingListItemModel {
  add = async (key, item) => {
    // AsyncStorage.clear();
    const exisitingItems = await AsyncStorage.getItem(key);
    let itemsArray = [];
    if (exisitingItems !== null) {
      itemsArray = JSON.parse(exisitingItems);
    }
    itemsArray.push(item);
    try {
      await AsyncStorage.setItem(key, JSON.stringify(itemsArray))
        .then(() => {
          //   console.log('saved successfully');
        })
        .catch(() => {
          //   console.log('error');
        });
    } catch (err) {
      // console.log(err);
    }
  };

  getItem = async key => AsyncStorage.getItem(key).then((result) => {
    if (result) {
      try {
        return JSON.parse(result);
      } catch (e) {
        // console.error(
        //   'AsyncStorage#getItem error deserializing JSON for key: ' + key,
        //   e.message
        // );
      }
    }
    return null;
  });
}
export default ShoppingListItemModel;
