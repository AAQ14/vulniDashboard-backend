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
        console.log('asset',asset)
        console.log('req.body',req.body)
        console.log('req.body.status',req.body.status)

        if (req.body.status !== 'Fixed') {
            if (req.body.rating === 'Critical') {
                 asset.vulnerabilities.critical+=1
            } else if (req.body.rating === 'High') {
                 asset.vulnerabilities.high+=1
            } else if (req.body.rating === 'low') {
                 asset.vulnerabilities.low+=1
            } else if (req.body.rating === 'medium') {
                 asset.vulnerabilities.medium+=1
               
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
        const allVulns = await Vulnerability.find().populate(['asset'])
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
        const vuln = await Vulnerability.findOneAndDelete(req.params.id)
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
