// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();
const cors =require('cors')

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// 👇 Start handling routes here

app.use("/api", require("./routes/index.routes.js"))
app.use("/auth", require("./routes/auth.routes.js"))

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
