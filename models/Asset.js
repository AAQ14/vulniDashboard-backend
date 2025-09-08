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
             none: 0,
            low : 0,
            medium:  0,
            high: 0,
            critical : 0
        }
    },user:{
        type: Schema.Types.ObjectId,
        ref: "User"
    }
})

const Asset = model('Asset', assetSchema)
module.exports = Asset