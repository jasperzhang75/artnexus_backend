const express = require('express');
const router = express.Router();
const { UploadedArtwork } = require('../models/Artwork.model');
const Wish = require('../models/Wish.model');
const isAuth = require('../middlewares/isAuthenticated');
const isArtist = require('../middlewares/isArtist');

// GET all uploaded artworks
router.get('/', async (req, res) => {
  try {
    const artworks = await UploadedArtwork.find();
    res.json(artworks);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching artworks' });
  }
});

// GET a specific uploaded artwork
router.get('/uploadedartworks/:id', async (req, res) => {
    try {
      const artwork = await UploadedArtwork.findById(req.params.id);
      if (!artwork) {
        return res.status(404).json({ error: 'Artwork not found' });
      }
      res.json(artwork);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching artwork' });
    }
  });
  

// POST create a new uploaded artwork
router.post('/uploadedartworks', isAuth, isArtist, async (req, res) => {
    try {
      const { title, description, date_start, artist_title, price, imageUrl } = req.body;
      if (!title || !date_start || !artist_title || !price || !imageUrl) {
        return res.status(400).json({ error: 'All fields are required' });
      }
      const artwork = new UploadedArtwork({
        title,
        description,
        date_start,
        artist_title,
        price,
        imageUrl,
        creator: req.userId,
      });
      await artwork.save();
      res.status(201).json(artwork);
    } catch (error) {
      res.status(500).json({ error: 'Error creating artwork' });
    }
  });

// DELETE an uploaded artwork
router.delete('/uploadedartworks/:id', isAuth, isArtist, async (req, res) => {
    try {
      const artwork = await UploadedArtwork.findByIdAndDelete(req.params.id);
      if (!artwork) {
        return res.status(404).json({ error: 'Artwork not found' });
      }
      res.status(200).json({ message: 'Artwork deleted' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting artwork' });
    }
  });
  
  // PUT modify an uploaded artwork
  router.put('/uploadedartworks/:id', isAuth, isArtist, async (req, res) => {
    try {
      const { title, description, date_start, artist_title, price, imageUrl } = req.body;
      if (!title || !description || !date_start || !artist_title || !price || !imageUrl) {
        return res.status(400).json({ error: 'All fields are required' });
      }
      const artwork = await UploadedArtwork.findByIdAndUpdate(
        req.params.id,
        { title, description, date_start, artist_title, price, imageUrl },
        { new: true }
      );
      if (!artwork) {
        return res.status(404).json({ error: 'Artwork not found' });
      }
      res.json(artwork);
    } catch (error) {
      res.status500.json({ error: 'Error updating artwork' });
    }
  });
  
  // GET wishlist status of an uploaded artwork
router.get('/uploadedartworks/:id/wish', isAuth, async (req, res) => {
    try {
      const wish = await Wish.findOne({ user: req.userId, artwork: req.params.id });
      res.json({ isWished: !!wish });
    } catch (error) {
      res.status(500).json({ error: 'Error checking wishlist status' });
    }
  });

// POST add an item to the wishlist
router.post('/:id/wish', isAuth, async (req, res) => {
  try {
    const wish = new Wish({
      user: req.userId,
      artwork: req.params.id,
    });
    await wish.save();
    res.status(201).json(wish);
  } catch (error) {
    res.status(500).json({ error: 'Error adding to wishlist' });
  }
});

module.exports = router;