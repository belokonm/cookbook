import { Router } from "express";
import { ObjectID } from "mongodb";

import { users } from "../helpers/db-helper";

var router = Router();

router.get("/", async (req, res) => {
  try {
    // Get the user
    const { user } = req;

    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.put("/preferences", async (req, res) => {
  try {
    // Get the user
    const { user } = req;

    await users().updateOne(
      {
        uid: user.uid
      },
      {
        $set: { preferences: req.body }
      }
    );

    const updatedUser = await users().findOne({
      uid: user.uid
    });

    return res.status(200).send(updatedUser);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.put("/recipes", async (req, res) => {
  try {
    // Get the user
    const { user } = req;

    await users().updateOne(
      {
        uid: user.uid
      },
      {
        $set: { recipes: req.body }
      }
    );

    const updatedUser = await users().findOne({
      uid: user.uid
    });

    return res.status(200).send(updatedUser);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.put("/favorites", async (req, res) => {
  try {
    // Get the user & the favorite to add.
    const { user } = req;
    const { favorite } = req.body;

    // Create a MongoDB object id with the favorite.
    const recipeId = new ObjectID(favorite);

    user.favorites = user.favorites || [];

    // Check if the favorite already exists.
    const existingFavoriteIndex = user.favorites.findIndex(x =>
      x.equals(recipeId)
    );

    // If it already exists, we remove it from the array, otherwise we add it.
    if (existingFavoriteIndex >= 0) {
      user.favorites.splice(existingFavoriteIndex, 1);
    } else {
      user.favorites.push(recipeId);
    }

    await users().updateOne(
      {
        uid: user.uid
      },
      {
        $set: { favorites: user.favorites }
      }
    );

    const updatedUser = await users().findOne({
      uid: user.uid
    });

    return res.status(200).send(updatedUser);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

export default router;
