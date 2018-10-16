import React from 'react';
import { Container, Header } from 'native-base';
import { StyleSheet } from 'react-native';
import ShoppingList from './components/ShoppingList';

export default class App extends React.Component {
  render() {
    return (
      <Container>
        <Header />
        <ShoppingList />
      </Container>
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center"
//   }
// });
