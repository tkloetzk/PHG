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
    this.refreshShoppingList();
  };

  componentWillReceieveProps = nextProps => {
    console.log(nextProps);
  };

  refreshShoppingList = () => {
    this.api.getItem("ShoppingList").then(list => {
      this.setState({ shoppingList: list });
    });
  };

  renderItem = ({ item }) => (
    <View>
      <Text>
        {item.title} {item.aisle}
      </Text>
    </View>
  );
  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          {this.state.addingTodo ? (
            <AddShoppingListItem
              onAdd={item => {
                this.setState({ addingTodo: false });
                this.api.add(item).then(res => this.refreshShoppingList());
              }}
              shoppingList={this.state.shoppingList}
              onCancelDelete={() => this.setState({ addingTodo: false })}
            />
          ) : null}
          <FlatList
            data={this.state.shoppingList}
            renderItem={this.renderItem}
          />
        </ScrollView>
        <Footer customEvent={() => this.setState({ addingTodo: true })} />
      </View>
    );
  }
}
