const Vulnerability = require("../models/Vulnerability")
const Application = require("../models/Application")
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

        const app = await Application.findById(req.body.app)
        if (req.body.status !== 'Fixed') {
            if (req.body.rating === 'Critical') {
                await app.vulnerabilities.Critical++
                app.save()
            } else if (req.body.rating === 'High') {
                await app.vulnerabilities.High++
                app.save()
            } else if (req.body.rating === 'Low') {
                await app.vulnerabilities.Low++
                app.save()
            } else if (req.body.rating === 'Medium') {
                await app.vulnerabilities.Medium++
                app.save()
            }
        }


        console.log(app)
        
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
            res.status(200).json(vuln)
        else
            res.sendStatus(404)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

const allVulns = async (req, res) => {
    try {
        const allVulns = await Vulnerability.find().populate(['app'])
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
    allVulns
}
