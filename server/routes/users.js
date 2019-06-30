import { Router } from "express";
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

export default router;
