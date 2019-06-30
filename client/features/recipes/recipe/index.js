import React from "react";
import { connect } from "react-redux";
import { StyleSheet, Image } from "react-native";
import { Text, CardItem, Card, View, Icon, Button } from "native-base";

import Colors from "../../../constants/Colors";
import { UPDATE_PROFILE_FAVORITE_REQUEST } from "../../profile/favorites/actions";

const RecipeComponent = ({ profile, onUpdateProfileFavorite, recipe }) => {
  const isFavorite = () =>
    profile.favorites && profile.favorites.some(x => x === recipe._id);

  return (
    <Card style={styles.recipeContainer} noShadow transparent>
      <CardItem header style={styles.recipeImageCardContainer}>
        <View style={styles.recipeImageViewContainer}>
          <Image
            source={{
              uri: recipe.imageUrl
            }}
            style={styles.recipeImage}
          />
        </View>
      </CardItem>
      <CardItem style={styles.recipeNameContainer}>
        <Text style={styles.recipeName}>{recipe.name}</Text>
        <Button transparent onPress={() => onUpdateProfileFavorite(recipe._id)}>
          <Icon
            name={isFavorite() ? "heart" : "hearto"}
            type="AntDesign"
            style={styles.favoriteIcon}
          />
        </Button>
      </CardItem>
      <CardItem footer style={styles.recipeDescriptionContainer}>
        <Text style={styles.recipeDescription}>
          Preparation: 45min {"\n"}Servings: 2 people
        </Text>
      </CardItem>
    </Card>
  );
};

const styles = StyleSheet.create({
  recipeContainer: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.18,
    shadowRadius: 6.68,
    borderRadius: 15,
    marginLeft: 10,
    marginRight: 10
  },
  recipeDay: {
    fontSize: 30,
    color: "#bcbcbc"
  },
  recipeImageCardContainer: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0
  },
  recipeImageViewContainer: {
    overflow: "hidden",
    height: 330,
    flex: 1,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15
  },
  recipeImage: {
    height: 330,
    flex: 1,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15
  },
  recipeNameContainer: {
    margin: 0
  },
  recipeName: {
    color: "#4f4f4f",
    fontSize: 20,
    marginTop: 10,
    textTransform: "capitalize",
    flex: 1
  },
  favoriteIcon: {
    color: Colors.red,
    marginTop: 10
  },
  recipeDescriptionContainer: {
    paddingTop: 0,
    marginTop: 0,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15
  },
  recipeDescription: {
    color: "#bcbcbc",
    marginBottom: 10
  }
});

const mapStateToProps = state => {
  return {
    profile: state.profile
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onUpdateProfileFavorite: favorite =>
      dispatch({
        type: UPDATE_PROFILE_FAVORITE_REQUEST,
        payload: { favorite }
      })
  };
};

export const Recipe = connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipeComponent);
