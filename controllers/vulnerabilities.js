const Vulnerability = require("../models/Vulnerability")
const cvss = require("cvss")

const createVuln = async (req, res) => {
    try {
        //Attack vactor
        const AV = req.body.attackVactor
        //Attack complexity
        const AC = req.body.attackComplexity
        //Privileges required
        const PR = req.body.privilegeRequired
        //Uesr Interaction
        const UI = req.body.userInteraction
        //scope
        const S = req.body.scope
        //confidentiality
        const C = req.body.confidentiality
        //integrity
        const I = req.body.integrity
        //availability
        const A = req.body.availability

        const vectorString = `CVSS:3.0/AV:${AV}/AC:${AC}/PR:${PR}/UI:${UI}/S:${S}/C:${C}/I:${I}/A:${A}`
        console.log(vectorString)
        const score = cvss.getScore(vectorString)
        console.log(score)
        req.body.score = score
        const rating = cvss.getRating(score)
        console.log(rating)
        req.body.rating = rating

        const createdVulnerability = await Vulnerability.create(req.body)
        if (createdVulnerability)
            res.status(201).json(createdVulnerability)
    } catch (err) {
        res.status(500).json({ error: err.message })
        console.log(err)
    }
}

const vulnIndex = async (req, res) => {
    try {
        const vuln = await Vulnerability.findById(req.params.id)
        if (vuln)
            res.status(200).josn(vuln)
        else
            res.sendStatus(404)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

const allVulns = async (req, res) => {
    try {
        const allVulns = await Vulnerability.find()
        if (allVulns)
            res.satatus(200).json(allVulns)
        else
            res.sendStatus(404)
    } catch (err) {
        res.status(500).josn({ error: err.message })
    }
}

const updateVul = async (req, res) => {
    try {
        const vuln = await Vulnerability.findByIdAndUpdate(req.params.id, req.body)
        if (vuln)
            res.satatus(200).json(vuln)
        else
            res.sendStatus(404)
    } catch (err) {
        res.satatus(500).json({ error: err.message })
    }
}

const deleteVuln = async (req, res) => {
    try {
        const vuln = await Vulnerability.findOneAndDelete(req.params.id)
        if (vuln)
            res.satatus(200).json(vuln)
        else
            res.sendStatus(500)
    } catch (err) {
        res.satatus(500).josn({ error: err.message })
    }
}

module.exports =
{
    createVuln,
    vulnIndex,
    deleteVuln,
    updateVul,
    allVulns
}
