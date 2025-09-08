const router = require("express").Router()
const {systemIndex, createSystem, systemDetails} = require("../controllers/system")

router.get("/", systemIndex)
router.post("/add", createSystem)
router.get("/details",systemDetails )

module.exports = router