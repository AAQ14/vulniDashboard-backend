const System = require("../models/System")

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


module.exports = {
    systemIndex,
    createSystem
}