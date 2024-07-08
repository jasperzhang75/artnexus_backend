const router = require("express").Router();



router.use("/user", require("../routes/user.route.js"))
router.use("/normalartworks", require("../routes/normalartworks.routes.js"))
router.use("/comment", require("../routes/comment.route.js"))
router.use("/favourite", require("../routes/favourite.routes.js"))
router.use("/uploadedartworks", require("../routes/uploadedartworks.routes.js"))
router.use("/wish", require("../routes/wish.routes.js"))



module.exports = router;
