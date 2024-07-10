const express = require('express');
const router = express.Router();
const { NormalArtwork } = require('../models/Artwork.model');
const Favourite = require('../models/Favourite.model');
const Comment = require('../models/Comment.model');
const isAuth = require('../middlewares/isAuthenticated');

// GET all normal artworks
router.get('/', async (req, res) => {
  try {
    const artworks = await NormalArtwork.find();
    res.json(artworks);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching artworks' });
  }
});

// GET a specific normal artwork
router.get('/:id', async (req, res) => {
    try {
      const artwork = await NormalArtwork.findById(req.params.id);
      if (!artwork) {
        return res.status(404).json({ error: 'Artwork not found' });
      }




      res.json(artwork);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching artwork' });
    }
  });
  
  // GET favourite status of a normal artwork
  router.get('/:id/favourite', isAuth, async (req, res) => {
    try {
      const favourite = await Favourite.findOne({ user: req.userId, artwork: req.params.id });
      res.json({ isFavourite: !!favourite });
    } catch (error) {
      res.status(500).json({ error: 'Error checking favourite status' });
    }
  });

// POST add one artwork to favourite
router.post('/:id/favourite', isAuth, async (req, res) => {
  try {
    const favourite = new Favourite({
      user: req.userId,
      artwork: req.params.id,
    });
    await favourite.save();
    res.status(201).json(favourite);
  } catch (error) {
    res.status(500).json({ error: 'Error adding favourite' });
  }
});

// GET comments of a normal artwork
router.get('/:id/comment', isAuth, async (req, res) => {
    try {
      const comments = await Comment.findOne({ creator: req.userId ,artwork: req.params.id });
      res.json(comments);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching comments' });
    }
  });
  
// POST add a comment to an artwork
router.post('/:id/comment', isAuth, async (req, res) => {
  try {
    const { content } = req.body;
    const comment = new Comment({
      content,
      creator: req.userId,
      artwork: req.params.id,
    });
    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: 'Error adding comment' });
  }
});



module.exports = router;