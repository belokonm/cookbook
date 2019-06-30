import { Router } from "express";
import { recipes, users } from "../helpers/db-helper";

var router = Router();

router.get("/", async (req, res) => {
  try {
    // Get the user
    const { user } = req;

    const recipes = await getRecipesFromIds(
      user.recipes[user.recipes.length - 1].recipeIds
    );

    return res.status(200).send(recipes);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.get("/generate", async (req, res) => {
  try {
    // Get the user
    const { user } = req;

    // Create an empty array if the user doesn't have any recipes.
    if (!user.recipes) {
      user.recipes = [];
    }

    // Generate 7 recipes and add them to the user.
    const generatedRecipes = await generateRecipes();
    const recipeIds = generatedRecipes.map(x => x._id);
    user.recipes.push({
      generatedDate: getCurrentDate(),
      recipeIds
    });

    await users().updateOne(
      {
        uid: user.uid
      },
      {
        $set: { recipes: user.recipes }
      }
    );

    const recipes = await getRecipesFromIds(recipeIds);

    return res.status(200).send(recipes);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

const generateRecipes = async () => {
  return await recipes()
    .aggregate([{ $sample: { size: 7 } }])
    .toArray();
};

const getCurrentDate = () => {
  return new Date().toISOString();
};

const getRecipesFromIds = async recipesIds => {
  return await recipes()
    .find({
      _id: {
        $in: recipesIds
      }
    })
    .sort({ _id: -1 })
    .toArray();
};

export default router;
