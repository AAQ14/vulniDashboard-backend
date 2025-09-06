const router = require("express").Router()
const {systemIndex, createSystem} = require("../controllers/system")

router.get("/", systemIndex)
router.post("/add", createSystem)

module.exports = router