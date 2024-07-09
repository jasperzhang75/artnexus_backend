const express = require("express");
const router = express.Router();
const Favourite = require("../models/Favourite.model");
const isAuth = require("../middlewares/isAuthenticated");

// DELETE remove one artwork from favourites list
router.delete("/:id", isAuth, async (req, res) => {
  try {
    const result = await Favourite.findOneAndDelete({
      user: req.userId,
      artwork: req.params.id,
    });
    if (!result) {
      return res.status(404).json({ error: "Favourite not found" });
    }
    res.status(200).json({ message: "Favourite removed" });
  } catch (error) {
    res.status(500).json({ error: "Error removing favourite" });
  }
});

// GET all favourite artworks of a user
router.get('/user-favourites', isAuth, async (req, res) => {
  try {
    const favourites = await Favourite.find({ user: req.userId }).populate('artwork');
    res.status(200).json(favourites);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching favourite artworks' });
  }
});


module.exports = router;
