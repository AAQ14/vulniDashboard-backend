const System = require("../models/System")
const Asset = require("../models/Asset")
const Vuln = require("../models/Vulnerability")

const systemIndex = async (req, res) => {
    try {
        const allsystems = await System.find()
        if (allsystems.length)
            res.status(200).json(allsystems)
        else
            res.sendStatus(404)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

const createSystem = async (req, res) => {
    try {
        const created = await System.create()
        res.status(201).json(created)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

async function test() {
    const assets = await Asset.find()
    // console.log(assets)
    let low = 0
    let numOfApp = 0 
    let numOfInfra = 0
    assets.forEach(asset => {
        low += asset.vulnerabilities.low
        if(asset.type === 'Web App' ||asset.type === 'Mobile App' ||asset.type === 'Desktop Software') 
               numOfApp += 1
            else
                numOfInfra += 1
    })
    // console.log(low)
    const vulns = await Vuln.find()
    // console.log(vulns)
    let openVuln = 0
    console.log(openVuln)
    vulns.forEach(vul => {
        if (vul.status === "Open") {
            openVuln += 1
        }
    })
    console.log(openVuln)
    console.log("num of app: " + numOfApp + " -- num of infra: " + numOfInfra)
    // test IMPP
 

}

test()

const updateSystem = async (req, res) => {
    try {
        const system = await System.findById(req.params.id)
        const vulns = await Vuln.find()
        const assets = await Asset.find()
        system.vulnerabilities = vulns.length

        assets.forEach(asset => {
            system.lowSeverityVulns += asset.vulnerabilities.low
            system.lowSeverityVulns += asset.vulnerabilities.medium
            system.lowSeverityVulns += asset.vulnerabilities.high
            system.lowSeverityVulns += asset.vulnerabilities.critical
            if(asset.type === 'Web App' ||asset.type === 'Mobile App' ||asset.type === 'Desktop Software') 
                system.applications += 1
            else
                system.infrastructures += 1
        })

        vulns.forEach(vul => {
            if (vul.status === "Open")
                system.openVulns += 1
            else if (vul.status === "Fixed")
                system.fixedVulns += 1
            else if (vul.status === "In progress")
                system.inProgressVulns += 1
        })

        system.save()

    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

module.exports = {
    systemIndex,
    createSystem
}