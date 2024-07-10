const { Schema, model } = require("mongoose");

const artworkSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required."],
    },
    description: {
      type: String
    },
    date_start: {
      type: Number,
      required: [true, "Date_start is required."],
    },
    artist_title: {
        type: String,
        required: [true, "Title is required."],
      },
  },

  {
    timestamps: true,
  }
);

const Artwork = model("Artwork", artworkSchema);

const UploadedArtwork = Artwork.discriminator(
  "UploadedArtwork",
  new Schema({
    price: {
      required: true,
      type: Number,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "Artist",
    },
    
    imageUrl: {
      type: String,
      required: false,
    },
  })
);

const NormalArtwork = Artwork.discriminator(
  "NormalArtwork",
  new Schema({
    type: {
      type: String,
      enum: ["impressionism", "modernism"],
    },
    artist_display: {
      type: String,
      required: [true, "Artist is required."],
    },
    date_end: {
      type: Number,
      required: [true, "Date_end is required."],
    },
    image_id: {
      type: String,
      required: [true, "Image ID is required."],
    },
  })
);

module.exports = { Artwork, UploadedArtwork, NormalArtwork };
