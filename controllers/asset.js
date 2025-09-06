const Asset = require("../models/Asset")

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

const assetIndex= async(req,res) =>{
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

const allAssets = async(req,res) => {
    try {
        const asset = await Asset.find()
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
    allAssets
}