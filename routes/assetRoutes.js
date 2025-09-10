const assetController = require('../controllers/asset')
const router = require('express').Router()

router.get("/:userId", assetController.assetIndex)
router.post("/add", assetController.createAsset)
router.get("/details/:id", assetController.assetDetails)
router.put("/update/:id", assetController.updateAsset)
router.delete("/delete/:id", assetController.deleteAsset)

module.exports = router