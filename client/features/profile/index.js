import React from "react";
import { connect } from "react-redux";
import { StyleSheet } from "react-native";
import {
  Header,
  Text,
  Title,
  Container,
  Content,
  Left,
  List,
  ListItem,
  Right,
  Body,
  Button,
  Icon
} from "native-base";
import firebase from "firebase";

import { SIGN_OUT_REQUEST } from "./actions";
import Colors from "../../constants/Colors";

const ProfileComponent = ({ onRequestSignOut }) => {
  return (
    <Container>
      <Header style={styles.header} hasTabs>
        <Left>
          <Title style={styles.headerTitle}>Profile</Title>
        </Left>
      </Header>
      <Content>
        <List>
          <ListItem itemHeader first>
            <Text>Account</Text>
          </ListItem>
          <ListItem icon>
            <Left>
              <Button
                style={{
                  backgroundColor: Colors.yellow,
                  borderRadius: "50%",
                  width: 20,
                  height: 20
                }}
              >
                <Icon
                  active
                  name="info"
                  type="AntDesign"
                  style={{ color: "white" }}
                />
              </Button>
            </Left>
            <Body>
              <Text>Information</Text>
            </Body>
            <Right>
              <Icon active name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem icon last>
            <Left>
              <Button
                style={{
                  backgroundColor: Colors.darkBlue,
                  borderRadius: "50%"
                }}
              >
                <Icon
                  active
                  name="lock1"
                  type="AntDesign"
                  style={{ color: "white" }}
                />
              </Button>
            </Left>
            <Body>
              <Text>Security</Text>
            </Body>
            <Right>
              <Icon active name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem itemHeader>
            <Text>Recipes</Text>
          </ListItem>
          <ListItem icon>
            <Left>
              <Button
                style={{ backgroundColor: Colors.blue, borderRadius: "50%" }}
              >
                <Icon
                  active
                  name="setting"
                  type="AntDesign"
                  style={{ color: "white" }}
                />
              </Button>
            </Left>
            <Body>
              <Text>Preferences</Text>
            </Body>
            <Right>
              <Icon active name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
              <Button
                style={{ backgroundColor: Colors.red, borderRadius: "50%" }}
              >
                <Icon
                  active
                  name="heart"
                  type="AntDesign"
                  style={{ color: "white" }}
                />
              </Button>
            </Left>
            <Body>
              <Text>Favorites</Text>
            </Body>
            <Right>
              <Icon active name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem onPress={onRequestSignOut}>
            <Text>Sign Out</Text>
          </ListItem>
        </List>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 80,
    borderBottomWidth: 0,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "#fff",
    marginTop: 30
  },
  headerTitle: {
    fontSize: 35,
    color: "#303030"
  }
});

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    onRequestSignOut: () => {
      dispatch({ type: SIGN_OUT_REQUEST });
      firebase.auth().signOut();
    }
  };
};

export const Profile = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileComponent);
