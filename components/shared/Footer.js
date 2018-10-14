import React from "react";
import { Footer as NativeFooter, FooterTab, Button, Item } from "native-base";
import Entypo from "react-native-vector-icons/Entypo";

const Footer = ({ customEvent }) => {
  return (
    <NativeFooter>
      <FooterTab>
        <Button active>
          <Entypo active name="add-to-list" color="#000" size={25} />
        </Button>
        <Button>
          <Entypo name="calendar" color="#000" size={25} />
        </Button>
        <Button>
          <Item backgroundColor="#3b5998">
            <Entypo.Button
              name="circle-with-plus"
              style={{ paddingLeft: 15, justifyContent: "center" }}
              size={25}
              onPress={customEvent}
            />
          </Item>
        </Button>
        <Button>
          <Entypo name="home" color="#000" size={25} />
        </Button>
        <Button>
          <Entypo name="menu" color="#000" size={25} />
        </Button>
      </FooterTab>
    </NativeFooter>
  );
};

export default Footer;
