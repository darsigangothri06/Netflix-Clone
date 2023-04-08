const router = require("express").Router()
const userController = require("../controllers/userController")

router.post("/add", userController.addToLikedMovies)
router.get("/liked/:email", userController.getLikedMovies)
router.put("/remove", userController.removeFromLikedMovies)

module.exports = router