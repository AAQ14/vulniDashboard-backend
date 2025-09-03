const applicationController = require('../controllers/applications')
const router = require('express').Router()

router.get("/", applicationController.allApps)
router.post("/add", applicationController.createApp)
router.get("/:id", applicationController.appIndex)
router.put("/update/:id", applicationController.updateApp)
router.delete("/delete/:id", applicationController.deleteApp)

module.exports = router