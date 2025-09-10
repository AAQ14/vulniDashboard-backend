const Vulnerability = require("../models/Vulnerability")
const Asset = require("../models/Asset")
const cvss = require("cvss")

const createVuln = async (req, res) => {
    try {
        //Attack vactor
        const AV = req.body.AV
        //Attack complexity
        const AC = req.body.AC
        //Privileges required
        const PR = req.body.PR
        //Uesr Interaction
        const UI = req.body.UI
        //scope
        const S = req.body.S
        //confidentiality
        const C = req.body.C
        //integrity
        const I = req.body.I
        //availability
        const A = req.body.A

        const vectorString = `CVSS:3.0/AV:${AV}/AC:${AC}/PR:${PR}/UI:${UI}/S:${S}/C:${C}/I:${I}/A:${A}`
        req.body.cvssVector = vectorString
        console.log(vectorString)
        const score = cvss.getScore(vectorString)
        console.log(score)
        req.body.score = score
        const rating = cvss.getRating(score)
        console.log(rating)
        req.body.rating = rating

        const asset = await Asset.findById(req.body.asset)
        console.log('asset', asset)
        console.log('req.body', req.body)
        console.log('req.body.status', req.body.status)

        if (req.body.status !== 'Fixed') {
            if (req.body.rating === 'Critical') {
                asset.vulnerabilities.critical += 1
            } else if (req.body.rating === 'High') {
                asset.vulnerabilities.high += 1
            } else if (req.body.rating === 'Low') {
                asset.vulnerabilities.low += 1
            } else if (req.body.rating === 'Medium') {
                asset.vulnerabilities.medium += 1
            }
        }


        const updatedAsset = await Asset.findByIdAndUpdate(asset._id, asset)

        console.log(updatedAsset)

        const createdVulnerability = await Vulnerability.create(req.body)
        if (createdVulnerability)
            res.status(201).json(createdVulnerability)
    } catch (err) {
        res.status(500).json({ error: err.message })
        console.log(err)
    }
}

const vulnDetails = async (req, res) => {
    try {
        const vuln = await Vulnerability.findById(req.params.id)
        if (vuln)
            res.status(200).json(vuln)
        else
            res.sendStatus(404)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

const vulnIndex = async (req, res) => {
    try { 
        //its giving me the vulnerabilties that are not matching the
        console.log(req.params.userId)

        const allVulns = await Vulnerability.find({ user: req.params.userId }).populate(['asset'])
        console.log(allVulns)
        if (allVulns)
            res.status(200).json(allVulns)
        else
            res.sendStatus(404)
    } catch (err) {
        res.status(500).josn({ error: err.message })
    }
}

const updateVul = async (req, res) => {
    try {
        const selectedVul = await Vulnerability.findById(req.params.id)
        console.log("this is the rating----", selectedVul.rating, "-----")


        //Attack vactor
        const AV = req.body.AV
        //Attack complexity
        const AC = req.body.AC
        //Privileges required
        const PR = req.body.PR
        //Uesr Interaction
        const UI = req.body.UI
        //scope
        const S = req.body.S
        //confidentiality
        const C = req.body.C
        //integrity
        const I = req.body.I
        //availability
        const A = req.body.A

        const vectorString = `CVSS:3.0/AV:${AV}/AC:${AC}/PR:${PR}/UI:${UI}/S:${S}/C:${C}/I:${I}/A:${A}`
        req.body.cvssVector = vectorString
        const score = cvss.getScore(vectorString)
        req.body.score = score
        const rating = cvss.getRating(score)
        req.body.rating = rating

        const asset = await Asset.findById(req.body.asset._id)


        if (req.body.rating !== selectedVul.rating) {
            console.log("the rating different ----prev rating ", selectedVul.rating, "----new rating", req.body.rating, "------")
            for (let [key, index] of Object.entries(asset.vulnerabilities)) {
                if (key === selectedVul.rating.toLowerCase()) {
                    asset.vulnerabilities[key] -= 1
                }
                if (key === req.body.rating.toLowerCase()) {
                    asset.vulnerabilities[key] += 1
                }
            }
        }

        await asset.save()
        const updatedAsset = await Asset.findByIdAndUpdate(asset._id, asset)
        console.log(asset)


        const vuln = await Vulnerability.findByIdAndUpdate(req.params.id, req.body)
        if (vuln)
            res.status(200).json(vuln)
        else
            res.sendStatus(404)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

const deleteVuln = async (req, res) => {
    try {
        const vuln = await Vulnerability.findByIdAndDelete(req.params.id)
        const asset = await Asset.findById(vuln.asset)
        for (let [key, index] of Object.entries(asset.vulnerabilities)){
            if(key === vuln.rating.toLowerCase())
            {
                asset.vulnerabilities[key] -= 1
            }
        }
        await Asset.findByIdAndUpdate(asset._id, asset)
        if (vuln)
            res.status(200).json(vuln)
        else
            res.sendStatus(500)
    } catch (err) {
        res.status(500).josn({ error: err.message })
    }
}

module.exports =
{
    createVuln,
    vulnIndex,
    deleteVuln,
    updateVul,
    vulnDetails
}
