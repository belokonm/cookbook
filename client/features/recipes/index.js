import React, { useEffect } from "react";
import { connect } from "react-redux";
import { StyleSheet, ScrollView, RefreshControl, Alert } from "react-native";
import {
  Header,
  Tab,
  Tabs,
  Container,
  Left,
  Right,
  Title,
  ScrollableTab,
  Content,
  Icon,
  Button
} from "native-base";

import { GET_RECIPES_REQUEST, GENERATE_RECIPES_REQUEST } from "./actions.js";
import { Recipe } from "./recipe/index.js";
import Colors from "../../constants/Colors";

const weekday = new Array(7);
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

const RecipesComponent = ({
  onGetRecipes,
  onGenerateRecipes,
  recipes,
  profile
}) => {
  const onGenerateRecipesPressed = () => {
    Alert.alert(
      "Attention",
      "If you proceed, you will lose your current recipes. Do you wish to continue?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "Continue", onPress: onGenerateRecipes }
      ],
      { cancelable: false }
    );
  };

  useEffect(() => {
    if (profile.preferences) {
      if (profile.recipes && profile.recipes.length > 0) {
        onGetRecipes();
      } else {
        onGenerateRecipes();
      }
    }
  }, [profile]);

  return (
    <Container>
      <Header style={styles.header} hasTabs>
        <Left>
          <Title style={styles.headerTitle}>Recipes</Title>
        </Left>
        <Right>
          <Button transparent onPress={onGenerateRecipesPressed}>
            <Icon name="reload1" type="AntDesign" style={styles.headerAction} />
          </Button>
        </Right>
      </Header>
      <Tabs
        renderTabBar={() => <ScrollableTab style={styles.tabs} />}
        tabBarBackgroundColor="#fff"
        tabBarUnderlineStyle={styles.tabBarUnderline}
      >
        {recipes && recipes.length > 0 ? (
          recipes.map((recipe, index) => (
            <Tab
              heading={weekday[index]}
              key={index}
              tabStyle={styles.tab}
              activeTabStyle={styles.activeTab}
              activeTextStyle={styles.tabActiveTextStyle}
            >
              <ScrollView
                refreshControl={
                  <RefreshControl refreshing={false} onRefresh={onGetRecipes} />
                }
              >
                <Content padder>
                  <Recipe recipe={recipe} />
                </Content>
              </ScrollView>
            </Tab>
          ))
        ) : (
          <Tab
            heading=""
            tabStyle={styles.tab}
            activeTabStyle={styles.activeTab}
            activeTextStyle={styles.tabActiveTextStyle}
          >
            <ScrollView
              refreshControl={
                <RefreshControl refreshing={false} onRefresh={onGetRecipes} />
              }
            />
          </Tab>
        )}
      </Tabs>
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
  },
  headerAction: {
    color: Colors.red,
    fontSize: 28
  },
  tabBarUnderline: {
    borderWidth: 0,
    backgroundColor: Colors.red
  },
  tabs: {
    marginBottom: 20,
    borderWidth: 0
  },
  tab: {
    backgroundColor: "#fff"
  },
  activeTab: {
    backgroundColor: "#fff"
  },
  tabActiveTextStyle: {
    color: Colors.red
  }
});

const mapStateToProps = state => {
  return {
    recipes: state.recipes,
    profile: state.profile
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetRecipes: () => dispatch({ type: GET_RECIPES_REQUEST }),
    onGenerateRecipes: () => dispatch({ type: GENERATE_RECIPES_REQUEST })
  };
};

export const Recipes = connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipesComponent);
