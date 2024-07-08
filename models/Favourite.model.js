const { Schema, model } = require("mongoose");

const favouriteSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    artwork: {
        type: Schema.Types.ObjectId,
        ref: 'NormalArtwork'
    },
}, {
    timestamps: true
})

const Favourite = model('Favourite', favouriteSchema)  
module.exports = Favourite;