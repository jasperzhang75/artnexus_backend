const { Schema, model } = require("mongoose");


const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    artworks:  [
        {
          type: Schema.Types.ObjectId,
          ref: 'UploadedArtwork',
          required: true,
        }
      ],
      status: {
        type: String,
        enum: ['pending', 'purchased'],
        default: 'pending',
      },
      purchasedAt: {
        type: Date,
        default: Date.now,
      },

}, {
    timestamps: true
})

const Order = model('Order', orderSchema)
module.exports = Order;