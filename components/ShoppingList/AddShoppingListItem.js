import React, { Component } from "react";
import { TouchableOpacity, AsyncStorage } from "react-native";
import { Button, View, Input, Segment, Text } from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default class AddShoppingListItem extends Component {
  state = {
    addingItem: false,
    item: {
      title: "",
      aisle: "",
      completed: false,
      storage: "Other",
      notes: ""
    },
    optionalFields: false
  };

  showOptionalFields = async () => {
    this.setState({ optionalFields: !this.state.optionalFields });
  };

  submit = () => {
    if (this.state.item.title.length > 0) {
      this.props.onAdd(this.state.item);
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
              <Button first>
                <Text>Pantry</Text>
              </Button>
              <Button>
                <Text>Fridge</Text>
              </Button>
              <Button>
                <Text>Freezer</Text>
              </Button>
              <Button last active>
                <Text>Other</Text>
              </Button>
            </Segment>
          )}
        </Grid>
      </View>
    );
  }
}
