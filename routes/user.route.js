const express = require('express');
const router = express.Router();
const Order = require('../models/Order.model');
const { UploadedArtwork } = require('../models/Artwork.model');
const User = require('../models/User.model');
const isAuth = require('../middlewares/isAuthenticated');
const isArtist = require('../middlewares/isArtist');

// GET /user/:id/added - Get artworks added to the cart
router.get('/:id/added', isAuth, async (req, res) => {
  try {
    const userId = req.params.id;

    // Check if the user in the request is the same as the authenticated user
    if (req.userId !== userId) {
      return res.status(403).json({ message: "Access forbidden: invalid user." });
    }

    // Find artworks added to the cart
    const cartItems = await Order.find({ user: userId, isAdded: true, isPurchased: false })
      .populate('artwork')
      .exec();

    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching cart items' });
  }
});

// GET /user/:id/purchased - Get purchased artworks
router.get('/:id/purchased', isAuth, async (req, res) => {
  try {
    const userId = req.params.id;

    // Check if the user in the request is the same as the authenticated user
    if (req.userId !== userId) {
      return res.status(403).json({ message: "Access forbidden: invalid user." });
    }

    // Find purchased artworks
    const purchasedItems = await Order.find({ user: userId, isPurchased: true })
      .populate('artwork')
      .exec();

    res.json(purchasedItems);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching purchased items' });
  }
});

// GET /user/:id/uploadedartworks - Get artworks uploaded by the user (only if the user is an artist)
router.get('/:id/uploadedartworks', isAuth, isArtist, async (req, res) => {
  try {
    const userId = req.params.id;

    // Find uploaded artworks
    const uploadedArtworks = await UploadedArtwork.find({ creator: userId }).exec();

    res.json(uploadedArtworks);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching uploaded artworks' });
  }
});

module.exports = router;