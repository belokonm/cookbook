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
  ListItem
} from "native-base";
import firebase from "firebase";

import { SIGN_OUT_REQUEST } from "./actions";

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
          <ListItem>
            <Text>Information</Text>
          </ListItem>
          <ListItem last>
            <Text>Security</Text>
          </ListItem>
          <ListItem itemHeader>
            <Text>Recipes</Text>
          </ListItem>
          <ListItem>
            <Text>Preferences</Text>
          </ListItem>
          <ListItem>
            <Text>Favorites</Text>
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
