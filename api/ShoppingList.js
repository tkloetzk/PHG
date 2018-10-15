import { AsyncStorage } from "react-native";

class ShoppingListItemModel {
  constructor(key) {}

  // add in key
  add = async item => {
    const exisitingItems = await AsyncStorage.getItem("ShoppingList");
    let itemsArray = [];
    if (exisitingItems !== null) {
      itemsArray = JSON.parse(exisitingItems);
    }
    itemsArray.push(item);
    try {
      await AsyncStorage.setItem("ShoppingList", JSON.stringify(itemsArray))
        .then(() => {
          console.log("saved successfully");
        })
        .catch(() => {
          console.log("error");
        });
    } catch (err) {
      console.log(err);
    }
  };

  // add = async key => {
  //   //AsyncStorage.clear();
  //   const body = {
  //     key: key.title,
  //     item: key.title
  //   };
  //   try {
  //     return await AsyncStorage.setItem(key, JSON.stringify(body));
  //   } catch (error) {
  //     // console.error('AsyncStorage#setItem error: ' + error.message);
  //   }

  //   // await this.getAllItems().then(shoppingList => {
  //   //   console.log(shoppingList);
  //   //   const c = shoppingList ? JSON.parse(shoppingList) : [];
  //   //   c.push(body);
  //   //   const st = JSON.stringify(c);
  //   //   AsyncStorage.setItem("ShoppingList", item.title, () => {
  //   //     console.log("success");
  //   //     AsyncStorage.getItem("ShoppingList", (error, result) => {
  //   //       console.log("result " + result);
  //   //     });
  //   //   });
  //   // });

  //   // AsyncStorage.getItem("ShoppingList").then((error, shoppingList) => {
  //   //   const c = shoppingList ? JSON.parse(shoppingList) : [];
  //   //   console.log(shoppingList);
  //   //   c.push(body);
  //   //   await AsyncStorage.setItem("ShoppingList", JSON.stringify(c), () => {
  //   //     console.log("success");
  //   //     AsyncStorage.getItem("ShoppingList", (error, result) => {
  //   //       console.log("result " + result);
  //   //     });
  //   //   });
  //   // });
  //   // const shoppingList = (await AsyncStorage.getItem("ShoppingList")) || "[]";
  //   // shoppingList = JSON.parse(shoppingList);
  //   // console.log(typeof shoppingList);
  //   // shoppingList.push(body);
  //   // console.log(shoppingList);
  //   // AsyncStorage.setItem("ShoppingList", JSON.stringify(shoppingList));
  // };

  // // async getAllItems() {
  // //   try {
  // //     return await AsyncStorage.getItem("ShoppingList").then(result => {
  // //       if (result) {
  // //         try {
  // //           result = JSON.parse(result);
  // //         } catch (e) {
  // //           console.log("error");
  // //         }
  // //       }
  // //       return result;
  // //     });
  // //   } catch (error) {
  // //     console.log(error);
  // //   }
  // // }
  getItem = async key => {
    return await AsyncStorage.getItem(key).then(result => {
      if (result) {
        try {
          result = JSON.parse(result);
        } catch (e) {
          console.error(
            "AsyncStorage#getItem error deserializing JSON for key: " + key,
            e.message
          );
        }
      }
      return result;
    });
  };
}
export default ShoppingListItemModel;
