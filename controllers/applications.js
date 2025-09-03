const Application = require("../models/Application")

const createApp = async(req,res)=>{
    try {
        const createdApp = await Application.create(req.body)
        if(createdApp)
            res.status(201).json(createdApp)
    } catch (err) {
        res.status(500).json({error: err.message})
        console.log(err)
    }
}

const appIndex= async(req,res) =>{
    try {
        const app = await Application.findById(req.params.id)
        if(app)
            res.status(200).json(app)
        else
            res.sendStatus(404)
    } catch (err) {
        res.status(500).json({error: err.message})
    }
}

const allApps = async(req,res) => {
    try {
        const apps = await Application.find()
        if(apps)
            res.status(200).json(apps)
        else
            res.sendStatus(404)
    } catch (err) {
        res.status(500).json({error: err.message})
    }
}

const updateApp = async(req,res) =>{
    try {
        const app = await Application.findByIdAndUpdate(req.params.id, req.body)
        if(app)
            res.status(200).json(app)
        else
            res.sendStatus(404)
    } catch (err) {
        res.status(500).json({error: err.message})
    }
}

const deleteApp = async(req,res) =>{
    try {
        const app = await Application.findByIdAndDelete(req.params.id)
        if(app)
            res.status(200).json(app)
        else
            res.sendStatus(404)
    } catch (err) {
        console.log(err)
        res.status(500).json({error: err.message})
    }
}

module.exports = {
    createApp, 
    appIndex,
    allApps,
    updateApp,
    deleteApp
}