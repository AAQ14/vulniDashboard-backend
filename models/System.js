const {model, Schema} = require("mongoose")

const systemSchema = new Schema({
    infrastructures : Number,
    applications: Number,
    vulnerabilities: Number,
    openVulns : Number,
    inProgressVulns : Number,
    fixedVulns : Number,
    lowSeverityVulns : Number,
    mediumSeverityVulns : Number,
    highSeverityVulns: Number,
    criticalSeverityVulns : Number
})

const System = model("System", systemSchema)
module.exports = System