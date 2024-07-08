const { Schema, model } = require("mongoose");


const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    artwork: {
        type: Schema.Types.ObjectId,
        ref: 'uploadedArtwork'
    },
    isAdded: {
        type: Boolean,
        default: false
    },
    isPurchased: {
        type: Boolean,
        default: false
    },

}, {
    timestamps: true
})

const Order = model('Order', orderSchema)
module.exports = Order;