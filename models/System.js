const {model, Schema} = require("mongoose")

const systemSchema = new Schema({
    userId :{type: Schema.Types.ObjectId, ref:"User"},
    infrastructures : {type: Number, default:0},
    applications: {type: Number, default:0},
    vulnerabilities: {type: Number, default:0},
    openVulns : {type: Number, default:0},
    inProgressVulns : {type: Number, default:0},
    fixedVulns : {type: Number, default:0},
    lowSeverityVulns : {type: Number, default:0},
    mediumSeverityVulns : {type: Number, default:0},
    highSeverityVulns: {type: Number, default:0},
    criticalSeverityVulns : {type: Number, default:0}
})

const System = model("System", systemSchema)
module.exports = System