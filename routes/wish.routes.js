const express = require('express');
const router = express.Router();
const Wish = require('../models/Wish.model');
const isAuth = require('../middlewares/isAuthenticated');

// DELETE remove an item from the wishlist
router.delete('/:id', isAuth, async (req, res) => {
  try {
    const result = await Wish.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ error: 'Wish not found' });
    }
    res.status(200).json({ message: 'Removed from wishlist' });
  } catch (error) {
    res.status(500).json({ error: 'Error removing from wishlist' });
  }
});

module.exports = router;