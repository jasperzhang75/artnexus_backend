const { Schema, model } = require("mongoose");

const wishSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    artwork: {
        type: Schema.Types.ObjectId,
        ref: 'uploadedArtwork'
    },
   
}, {
    timestamps: true
})

const Wish=  model('Wish', wishSchema)  
module.exports = Wish;