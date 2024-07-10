const express = require('express');
const router = express.Router();
const Order = require('../models/Order.model');
const { UploadedArtwork } = require('../models/Artwork.model');
const isAuth = require('../middlewares/isAuthenticated');
const isArtist = require('../middlewares/isArtist');

// // GET /order/cart - Get artworks added to the cart
// router.get('/cart', isAuth, async (req, res) => {
//   try {

//     // Find artworks added to the cart
//     const cartItems = await Order.findOne({ user: req.userId, status: "pending"  })
//       .populate('artworks')

//     res.json(cartItems);
//   } catch (error) {
//     res.status(500).json({ error: 'Error fetching cart items' });
//   }
// });

// router.post("/add-to-cart", isAuth, async (req, res) => {
//   const { artworkId } = req.body;
//   const orderExist = await Order.exists({ user: req.userId, status: "pending" });
//   if (orderExist) {
//     const updatedOrder = await Order.findByIdAndUpdate(orderExist._id, {$push: {artworks: artworkId}}, {new: true});
//     return res.json(updatedOrder);
//   } else {
//     const newOrder =  await Order.create({
//       user: req.userId,
//       artworks: [artworkId],
//     });
   
//     return res.json(newOrder);
//   } 
// })

// router.put ("/purchase", isAuth, async (req, res) => {
//   const order = await Order.findOneAndUpdate({ user: req.userId, status: "purchased" });
// })



// // GET /user/:id/purchased - Get purchased artworks
// router.get('/:id/purchased', isAuth, async (req, res) => {
//   try {
//     const userId = req.params.id;

//     // Check if the user in the request is the same as the authenticated user
//     if (req.userId !== userId) {
//       return res.status(403).json({ message: "Access forbidden: invalid user." });
//     }

//     // Find purchased artworks
//     const purchasedItems = await Order.find({ user: userId, isPurchased: true })
//       .populate('artwork')
//       .exec();

//     res.json(purchasedItems);
//   } catch (error) {
//     res.status(500).json({ error: 'Error fetching purchased items' });
//   }
// });

// GET /user/uploadedartworks - Get artworks uploaded by the user (only if the user is an artist)
router.get('/uploadedartworks', isAuth, isArtist, async (req, res) => {
  try {
    // Find uploaded artworks
    const uploadedArtworks = await UploadedArtwork.find({ creator: req.userId });
    res.json(uploadedArtworks);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching uploaded artworks' });
  }
});


module.exports = router;