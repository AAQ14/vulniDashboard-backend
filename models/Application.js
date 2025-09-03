const {Schema, model} = require("mongoose")

const applicationSchema = new Schema({
    appName : {
        type: String,
        required: true
    }, type: {
        type: String,
        required : true
    }, identifier: {
        type: String,
        required: true
    }, owner: String
})

const Application = model('Application', applicationSchema)
module.exports = Application