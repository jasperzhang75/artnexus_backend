const express = require('express');
const router = express.Router();
const Order = require('../models/Order.model');
const isAuth = require('../middlewares/isAuthenticated');

// GET /order/cart - Get all artworks added to the cart
router.get('/cart', isAuth, async (req, res) => {
  try {
    const cartItems = await Order.findOne({ user: req.userId, status: "pending" })
      .populate('artworks');
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching cart items' });
  }
});

// POST /order/add-to-cart/:id - Add new artwork to the cart
router.post('/add-to-cart/:id', isAuth, async (req, res) => {
  const artworkId = req.params.id;
  try {
    let order = await Order.findOne({ user: req.userId, status: "pending" });
    if (order) {
      if (!order.artworks.includes(artworkId)) {
        order.artworks.push(artworkId);
        await order.save();
      }
    } else {
      order = new Order({
        user: req.userId,
        artworks: [artworkId],
      });
      await order.save();
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Error adding to cart' });
  }
});

// DELETE /order/delete-item/:id - Delete one item from the cart
router.delete('/delete-item/:id', isAuth, async (req, res) => {
  const artworkId = req.params.id;
  try {
    const order = await Order.findOne({ user: req.userId, status: "pending" });
    if (!order || !order.artworks.includes(artworkId)) {
      return res.status(404).json({ error: 'Artwork not found in cart' });
    }
    order.artworks.pull(artworkId);
    await order.save();
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Error removing from cart' });
  }
});

// PUT /order/purchase - Mark the order as purchased
router.put('/purchase', isAuth, async (req, res) => {
  try {
    const order = await Order.findOneAndUpdate(
      { user: req.userId, status: "pending" },
      { status: "purchased", purchasedAt: Date.now() },
      { new: true }
    );
    if (!order) {
      return res.status(404).json({ error: 'No pending order found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Error purchasing artworks' });
  }
});

// GET /order/purchased - Get all purchased artworks by this single user
router.get('/purchased', isAuth, async (req, res) => {
    try {
      const purchasedOrders = await Order.find({ user: req.userId, status: "purchased" })
        .populate('artworks');

      const purchasedArtworks = purchasedOrders.reduce((acc, order) => {
        return acc.concat(order.artworks);
      }, []);
  
      res.json(purchasedArtworks);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching purchased items' });
    }
  });

  // GET /order/purchased/:id - Check if a specific artwork has been purchased by the user
router.get('/purchased/:id', isAuth, async (req, res) => {
    const artworkId = req.params.id;
    try {
      const order = await Order.findOne({ user: req.userId, artworks: artworkId, status: "purchased" });
      const isPurchased = !!order;
      res.json({ isPurchased });
    } catch (error) {
      res.status(500).json({ error: 'Error checking purchase status' });
    }
  });

module.exports = router;