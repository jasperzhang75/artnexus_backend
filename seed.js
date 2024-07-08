const mongoose = require("mongoose");
require("dotenv").config();
const { NormalArtwork, UploadedArtwork } = require("./models/Artwork.model");
const bcrypt = require ("bcryptjs")
const normalArtworksData = require("./artworks.json");
const uploadedArtworksData = require("./uploadedArtworks.json");
const password = bcrypt.hashSync(process.env.SEED_PASSWORD, 12)

const User  = require("./models/User.model");

const user = {
  username: "JasperChang",
  email: "jasper.chang.chn@gmail.com",
  password: password,
  isArtist: true,
  firstName: "Jasper",
  lastName: "Chang",
}


mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Connected to MongoDB");

    await NormalArtwork.deleteMany({});

    await NormalArtwork.insertMany(normalArtworksData);

    await User.deleteMany({});
    const createdUser = await User.create(user);

    await UploadedArtwork.deleteMany({});
    for (let artwork of uploadedArtworksData) {
      artwork.creator = createdUser._id;
    }
    await UploadedArtwork.insertMany(uploadedArtworksData);



    console.log("Data successfully seeded");
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });
