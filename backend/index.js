require("dotenv")
.config();
const express = require("express");
const dbConnect = require("./config/databaseConfig")
const cookieParser = require("cookie-parser")
const authRouter = require("./routes/auth.route.js")
const tokensRouter = require("./routes/tokens.route.js")
const saloonRouter = require("./routes/saloon.route.js");
const cors = require("cors")

const app = express();

app.use(cors({
    origin : "http://localhost:5173",
    credentials : true
}))
app.use(express.json())
app.use(cookieParser())
app.use("/",authRouter)
app.use("/",tokensRouter)
app.use("/",saloonRouter)

const port = 7777;

dbConnect()
.then(()=>{
    app.listen(port,(req,res)=>{
        console.log(`App is listening on port ${port}`)
    })
})
.catch((err)=>{
    console.log("Database connection failed")
})

