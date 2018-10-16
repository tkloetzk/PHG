import React, { Component } from 'react';
import { FlatList, ScrollView } from 'react-native';
import {
  View, Text, ListItem, CheckBox, Body,
} from 'native-base';
import { sortBy } from 'lodash';
import AddShoppingListItem from './ShoppingList/AddShoppingListItem';
import ShoppingListItemModel from '../api/ShoppingList';
import Footer from './shared/Footer';

export default class ShoppingList extends Component {
  state = {
    addingTodo: false,
    shoppingList: [],
  };

  componentDidMount = () => {
    this.api = new ShoppingListItemModel();
    this.refreshShoppingList();
  };

  refreshShoppingList = () => {
    this.api.getItem('ShoppingList').then((list) => {
      console.log(list);
      this.setState({ shoppingList: sortBy(list, 'aisle') });
    });
  };

  renderItem = ({ item }) => (
    <ListItem title={item.title} subtitle={item.notes}>
      <Text>{item.quantity}</Text>
      <Body>
        <Text>{item.title}</Text>
        {item.notes && <Text style={{ fontSize: 11 }}>{item.notes}</Text>}
      </Body>
      <Text style={{ paddingRight: 10 }}>{item.aisle}</Text>
      <CheckBox checked />
    </ListItem>
  );

  render() {
    const { addingTodo, shoppingList } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          {addingTodo ? (
            <AddShoppingListItem
              onAdd={(item) => {
                this.setState({ addingTodo: false });
                this.api.add('ShoppingList', item).then(this.refreshShoppingList());
              }}
              shoppingList={shoppingList}
              onCancelDelete={() => this.setState({ addingTodo: false })}
            />
          ) : null}
          <FlatList data={shoppingList} renderItem={this.renderItem} />
        </ScrollView>
        <Footer customEvent={() => this.setState({ addingTodo: true })} />
      </View>
    );
  }
}
