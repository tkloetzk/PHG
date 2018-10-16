import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import {
  Button, View, Input, Segment, Text, Item,
} from 'native-base';
import { Row, Grid } from 'react-native-easy-grid';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { findIndex } from 'lodash';
import PropTypes from 'prop-types';
import { fetchItemTCIN, fetchTCINAisle } from '../../service/shoppingList/redsky';

export default class AddShoppingListItem extends Component {
  state = {
    item: {
      title: '',
      aisle: '',
      completed: false,
      storage: 'other',
      notes: '',
      quantity: 1,
    },
    optionalFields: false,
  };

  showOptionalFields = async () => {
    const { optionalFields } = this.state;
    this.setState({ optionalFields: !optionalFields });
  };

  submit = async () => {
    const { item } = this.state;
    const { shoppingList, onAdd } = this.props;

    if (item.title.length > 0) {
      const index = findIndex(shoppingList, {
        title: item.title,
      });
      if (index < 0) {
        const tcin = await fetchItemTCIN(item.title);
        const aisle = await fetchTCINAisle(tcin);
        console.log(aisle);
        this.setState(
          {
            item: { ...this.state.item, aisle },
          },
          () => {
            onAdd(this.state.item);
          },
        );
      } else {
        console.log(`highlight item at index ${index}`);
      }
    }

    return null;
  };

  render() {
    const { item, optionalFields } = this.state;
    const { onCancelDelete } = this.props;
    return (
      <View
        style={{
          borderBottomColor: 'grey',
          borderBottomWidth: 1,
        }}
      >
        <Grid>
          <Row>
            <TouchableOpacity
              onPress={() => onCancelDelete()}
              style={{ paddingLeft: 25, paddingRight: 15 }}
            >
              <MaterialCommunityIcons
                name="cancel"
                color={`${item.title.length > 0 ? 'black' : 'grey'}`}
                size={30}
                style={{ paddingTop: 10, marginLeft: -20 }}
              />
            </TouchableOpacity>

            <Input
              // style={styles.textInput}
              autoFocus
              onChangeText={title => this.setState(prevState => ({
                item: {
                  ...prevState.item,
                  title,
                },
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
          {optionalFields && (
            <View>
              <Segment style={{ backgroundColor: 'white' }}>
                <Button
                  first
                  active={item.storage === 'pantry'}
                  onPress={() => this.setState({
                    item: { ...item, storage: 'pantry' },
                  })
                  }
                >
                  <Text>Pantry</Text>
                </Button>
                <Button
                  active={item.storage === 'fridge'}
                  onPress={() => this.setState({
                    item: { ...item, storage: 'fridge' },
                  })
                  }
                >
                  <Text>Fridge</Text>
                </Button>
                <Button
                  active={item.storage === 'freezer'}
                  onPress={() => this.setState({
                    item: { ...item, storage: 'freezer' },
                  })
                  }
                >
                  <Text>Freezer</Text>
                </Button>
                <Button
                  last
                  active={item.storage === 'other'}
                  onPress={() => this.setState({
                    item: { ...item, storage: 'other' },
                  })
                  }
                >
                  <Text>Other</Text>
                </Button>
              </Segment>
              <Item rounded style={{ paddingBottom: 15, marginBottom: 7 }}>
                <Input
                  placeholder="Notes"
                  value={item.notes}
                  returnKeyType="done"
                  returnKeyLabel="done"
                  onChangeText={notes => this.setState(prevState => ({
                    item: {
                      ...prevState.item,
                      notes,
                    },
                  }))
                  }
                  onSubmitEditing={this.submit}
                />
              </Item>
            </View>
          )}
        </Grid>
      </View>
    );
  }
}

AddShoppingListItem.propTypes = {
  onCancelDelete: PropTypes.func.isRequired,
};
