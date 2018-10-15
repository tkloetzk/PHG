import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import { Button, View, Input, Segment, Text } from "native-base";
import { Row, Grid } from "react-native-easy-grid";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  fetchItemTCIN,
  fetchTCINAisle
} from "../../service/shoppingList/redsky";
import { findIndex } from "lodash";

export default class AddShoppingListItem extends Component {
  state = {
    addingItem: false,
    item: {
      title: "",
      aisle: "",
      completed: false,
      storage: "other",
      notes: ""
    },
    optionalFields: false
  };

  showOptionalFields = async () => {
    this.setState({ optionalFields: !this.state.optionalFields });
  };

  submit = async () => {
    if (this.state.item.title.length > 0) {
      const index = findIndex(this.props.shoppingList, {
        title: this.state.item.title
      });
      if (index < 0) {
        const tcin = await fetchItemTCIN(this.state.item.title);
        const aisle = await fetchTCINAisle(tcin);
        this.setState(
          {
            item: { ...this.state.item, aisle }
          },
          () => {
            this.props.onAdd(this.state.item);
          }
        );
        console.log(aisle);
      } else {
        console.log("highlight item at index " + index);
      }
    }

    return null;
  };

  render() {
    const { item } = this.state;
    return (
      <View>
        <Grid>
          <Row>
            <TouchableOpacity
              onPress={() => this.props.onCancelDelete()}
              style={{ paddingLeft: 25, paddingRight: 15 }}
            >
              <MaterialCommunityIcons
                name="cancel"
                color={`${item.title.length > 0 ? "black" : "grey"}`}
                size={30}
                style={{ paddingTop: 10, marginLeft: -20 }}
              />
            </TouchableOpacity>

            <Input
              // style={styles.textInput}
              autoFocus
              onChangeText={title =>
                this.setState(prevState => ({
                  item: {
                    ...prevState.item,
                    title
                  }
                }))
              }
              onSubmitEditing={this.submit}
              value={item.title}
              placeholder="Add item"
              returnKeyType="done"
              returnKeyLabel="done"
              autoCorrect={false}
              autoCapitalize="none"
            />
            <MaterialCommunityIcons
              name="dots-horizontal"
              style={{ paddingRight: 15, paddingTop: 5 }}
              size={30}
              color="#000"
              onPress={this.showOptionalFields}
            />
          </Row>
          {this.state.optionalFields && (
            <Segment style={{ backgroundColor: "white" }}>
              <Button
                first
                active={this.state.item.storage == "pantry"}
                onPress={() =>
                  this.setState({
                    item: { ...this.state.item, storage: "pantry" }
                  })
                }
              >
                <Text>Pantry</Text>
              </Button>
              <Button
                active={this.state.item.storage == "fridge"}
                onPress={() =>
                  this.setState({
                    item: { ...this.state.item, storage: "fridge" }
                  })
                }
              >
                <Text>Fridge</Text>
              </Button>
              <Button
                active={this.state.item.storage == "freezer"}
                onPress={() =>
                  this.setState({
                    item: { ...this.state.item, storage: "freezer" }
                  })
                }
              >
                <Text>Freezer</Text>
              </Button>
              <Button
                last
                active={this.state.item.storage == "other"}
                onPress={() =>
                  this.setState({
                    item: { ...this.state.item, storage: "other" }
                  })
                }
              >
                <Text>Other</Text>
              </Button>
            </Segment>
          )}
        </Grid>
      </View>
    );
  }
}
