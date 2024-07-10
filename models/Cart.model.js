const { Schema, model } = require("mongoose");

const cartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  artworks: [{
    type: Schema.Types.ObjectId,
    ref: 'UploadedArtwork',
    required: true,
  }],
}, {
  timestamps: true,
});

const Cart = model('Cart', cartSchema);
module.exports = Cart;