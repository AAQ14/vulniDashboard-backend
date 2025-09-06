const System = require("../models/System")
const Asset = require("../models/Asset")
const Vuln = require("../models/Vulnerability")

const systemIndex = async(req,res) =>{
    try {
        const allsystems = await System.find()
        if(allsystems.length)
            res.status(200).json(allsystems)
        else
            res.sendStatus(404)
    } catch (err) {
        res.status(500).json({error: err.message})
    }
}

const createSystem = async(req,res) =>{
    try {
        const created = await System.create(req.body)
        res.status(201).json(created)
    } catch (err) {
        res.status(500).json({error: err.message})
    }
}

async function test(){
    const assets = await Asset.find()
    console.log(assets)
    let low = 0
    assets.forEach(asset => {
       low += asset.vulnerabilities.low
    })
    console.log(low)
    // const vulns = await Vuln.find()
    // console.log(vulns.length)
}

test()

const updateSystem = async (req,res) =>{
    try {
        const system = await System.findById(req.params.id)
        const vulns = await Vuln.find()
        const assets = await Asset.find()
        system.vulnerabilities = vulns.length

        assets.forEach(asset =>{
            system.lowSeverityVulns += asset.vulnerabilities.low
            system.lowSeverityVulns += asset.vulnerabilities.medium
            system.lowSeverityVulns += asset.vulnerabilities.high
            system.lowSeverityVulns += asset.vulnerabilities.critical
        })
        
    } catch (err) {
        res.status(500).json({error: err.message})
    }
}

module.exports = {
    systemIndex,
    createSystem
}