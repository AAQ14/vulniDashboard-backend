const router = require("express").Router()
const vulnController = require("../controllers/vulnerabilities")

router.get("/", vulnController.allVulns)
router.post("/add", vulnController.createVuln)
router.get("/:id", vulnController.vulnIndex)
router.put("/update/:id", vulnController.updateVul)
router.delete("/delete/:id", vulnController.deleteVuln)

module.exports = router