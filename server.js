const express = require("express")
app = express()
const logger = require("morgan")
const dotenv = require("dotenv").config()
const mongoose = require("mongoose")
const cors = require("cors")
// const cookieParser = require("cookie-parser")
const vulnRouter = require("./routes/vulnRoutes")
const assetRouter = require("./routes/assetRoutes")
const authRouter = require("./routes/authRoutes")
const systemRouter = require("./routes/systemRoutes")

app.use(logger('dev'))
app.use(express.json())
// app.use(cookieParser)
app.use(express.urlencoded({extended: true}))
app.use(cors({credentials: true}))

console.log(process.env.DB_URI)

mongoose.connect(process.env.DB_URI)
.then(()=>{console.log("Connected")})
.catch((err)=>{console.log(err)})
// mongoose.connection.on("connect", ()=>{
//     console.log('connected to mongoDB')
// })


app.use('/vulnerabilities',vulnRouter)
app.use('/assets', assetRouter)
app.use('/auth', authRouter)
app.use('/systems', systemRouter)

app.listen(3000, ()=>{
    console.log("listening on port 3000")
})