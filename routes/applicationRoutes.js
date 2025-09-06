const assetController = require('../controllers/asset')
const router = require('express').Router()

router.get("/", assetController.allAssets)
router.post("/add", assetController.createAsset)
router.get("/:id", assetController.assetIndex)
router.put("/update/:id", assetController.updateAsset)
router.delete("/delete/:id", assetController.deleteAsset)

module.exports = router