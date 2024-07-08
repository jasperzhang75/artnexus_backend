const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment.model');
const isAuth = require('../middlewares/isAuthenticated');

// PUT modify a comment
router.put('/:id', isAuth, async (req, res) => {
  try {
    const { content } = req.body;
    const comment = await Comment.findByIdAndUpdate(
      req.params.id,
      { content },
      { new: true }
    );
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    res.json(comment);
  } catch (error) {
    res.status(500).json({ error: 'Error updating comment' });
  }
});

module.exports = router;