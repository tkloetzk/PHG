import React, { Component } from "react";
import { FlatList, ScrollView } from "react-native";
import { View, Text } from "native-base";
import AddShoppingListItem from "./ShoppingList/AddShoppingListItem";
import ShoppingListItemModel from "../api/ShoppingList";
import Footer from "./shared/Footer";

export default class ShoppingList extends Component {
  state = {
    addingTodo: false,
    shoppingList: []
  };

  componentDidMount = () => {
    this.api = new ShoppingListItemModel();
  };

  renderItem = ({ item }) => (
    <View>
      <Text>{item.name}</Text>
    </View>
  );
  render() {
    const data = [
      {
        name: "Test"
      },
      {
        name: "Test2"
      },
      {
        name: "Test3"
      }
    ];
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          {this.state.addingTodo ? (
            <AddShoppingListItem
              onAdd={item => {
                this.setState({ addingTodo: false });
                this.api.add(item);
              }}
              onCancelDelete={() => this.setState({ addingTodo: false })}
            />
          ) : null}
          <FlatList data={data} renderItem={this.renderItem} />
        </ScrollView>
        <Footer customEvent={() => this.setState({ addingTodo: true })} />
      </View>
    );
  }
}
