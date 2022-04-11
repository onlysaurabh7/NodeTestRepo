const express = require("express");
const path=require("path")
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const userRouter=require("./routes/user")
const blogRouter=require("./routes/blog")
const commentRouter=require("./routes/comment")
const db = require("./config/db");
require("dotenv").config();


app.use(bodyParser.json());
app.use(cors());


// app.set('view engine', 'ejs');
app.use("/api",userRouter)
app.use("/",blogRouter)
app.use("/",commentRouter)


app.listen(process.env.port,()=>{
    console.log(`Express app is running on port ${process.env.port}`)
})
