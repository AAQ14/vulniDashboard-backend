const System = require("../models/System")
const Asset = require("../models/Asset")
const Vuln = require("../models/Vulnerability")

const systemIndex = async (req, res) => {
    try {
        const allsystems = await System.find()
        if (allsystems.length)
            return res.status(200).json(allsystems)
        else
            return res.sendStatus(404)
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

const createSystem = async (req, res) => {
    try {
        const created = await System.create(req.body)
        return res.status(201).json(created)
    } catch (err) {
        return res.status(500).json({ error: err.message })
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
        if (asset.type === 'Web App' || asset.type === 'Mobile App' || asset.type === 'Desktop Software')
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

    const findAssets = await Asset.find({ user: "68b81d302279241b23e01f04" })
    console.log(findAssets)
    // const vulns = await Vuln.find()

}

// test()

const updateSystem = async (req, res) => {
    try {
        const system = await System.findOne({ userId: req.body.userId })
        system.vulnerabilities = 0
        system.applications = 0
        system.infrastructures = 0
        system.lowSeverityVulns = 0
        system.mediumSeverityVulns = 0
        system.highSeverityVulns = 0
        system.criticalSeverityVulns = 0
        system.openVulns = 0
        system.fixedVulns = 0
        system.inProgressVulns = 0
        
        // for (let [key, index] of Object.entries(system)){
        //     if(key!=="_id" && key!==userId)
        //         system[key] =0
        // }
        console.log("this is system", system)

        const vulns = await Vuln.find({ user: req.body.userId })
        console.log(vulns)
        const assets = await Asset.find({ user: req.body.userId })
        console.log(assets)
        system.vulnerabilities = vulns.length

        assets.forEach(asset => {
            system.lowSeverityVulns += asset.vulnerabilities.low
            system.mediumSeverityVulns += asset.vulnerabilities.medium
            system.highSeverityVulns += asset.vulnerabilities.high
            system.criticalSeverityVulns += asset.vulnerabilities.critical
            if (asset.type === 'Web App' || asset.type === 'Mobile App' || asset.type === 'Desktop Software')
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

        return res.status(200).json(system)

    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

const systemDetails = async (req, res) => {
    try {
        const system = await System.findOne({ userId: req.params.id })
        // updateSystem(system)
        if (system) {
            return res.status(200).json(system)
        } else {
            return res.sendStatus(404)
        }
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}


module.exports = {
    systemIndex,
    createSystem,
    systemDetails,
    updateSystem
}