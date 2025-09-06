const {Schema, model} = require("mongoose")

const assetSchema = new Schema({
    name : {
        type: String,
        required: true
    }, type: {
        type: String,
        required : true
    }, identifier: {
        type: String,
        required: true
    }, owner: String,
    vulnerabilities: {
        type: Object,
        properties:{
            none: Number,
            low : Number,
            medium:  Number,
            high:  Number,
            critical : Number
        },
        default: {
             None: 0,
            Low : 0,
            Medium:  0,
            High: 0,
            Critical : 0
        }
    }
})

const Asset = model('Asset', assetSchema)
module.exports = Asset