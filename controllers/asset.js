const Asset = require("../models/Asset")
const Vulnerability = require("../models/Vulnerability")

const createAsset = async(req,res)=>{
    try {
        const createdAsset = await Asset.create(req.body)
        if(createdAsset)
            res.status(201).json(createdAsset)
    } catch (err) {
        res.status(500).json({error: err.message})
        console.log(err)
    }
}

const assetDetails= async(req,res) =>{
    try {
        const asset = await Asset.findById(req.params.id)
        if(asset)
            res.status(200).json(asset)
        else
            res.sendStatus(404)
    } catch (err) {
        res.status(500).json({error: err.message})
    }
}

const assetIndex = async(req,res) => {
    try {
        const asset = await Asset.find({user: req.params.userId})
        if(asset)
            res.status(200).json(asset)
        else
            res.sendStatus(404)
    } catch (err) {
        res.status(500).json({error: err.message})
    }
}

const updateAsset = async(req,res) =>{
    try {
        const asset = await Asset.findByIdAndUpdate(req.params.id, req.body)
        if(asset)
            res.status(200).json(asset)
        else
            res.sendStatus(404)
    } catch (err) {
        res.status(500).json({error: err.message})
    }
}

const deleteAsset = async(req,res) =>{
    try {
        const asset = await Asset.findByIdAndDelete(req.params.id)
        const vulns = await Vulnerability.find({asset : asset._id})
        
        vulns.forEach(async vul=>{
            await Vulnerability.findByIdAndDelete(vul._id)
        })

        if(asset)
            res.status(200).json(asset)
        else
            res.sendStatus(404)
    } catch (err) {
        console.log(err)
        res.status(500).json({error: err.message})
    }
}

module.exports = {
    createAsset,
    deleteAsset,
    updateAsset,
    assetIndex,
    assetDetails
}