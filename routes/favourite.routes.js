const express = require('express');
const router = express.Router();
const Favourite = require('../models/Favourite.model');
const isAuth = require('../middlewares/isAuthenticated');

// DELETE remove one artwork from favourites list
router.delete('/:id', isAuth, async (req, res) => {
  try {
    const result = await Favourite.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ error: 'Favourite not found' });
    }
    res.status(200).json({ message: 'Favourite removed' });
  } catch (error) {
    res.status(500).json({ error: 'Error removing favourite' });
  }
});

module.exports = router;