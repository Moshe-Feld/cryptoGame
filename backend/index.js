const express = require('express')
const cors = require('cors')
const connect = require('./mongoDB');

const app = express();
app.use(express.json());
app.use(cors());
const userRouter = require("./routers/user.router")
const quoteRouter = require("./routers/quote.router")
const classRouter = require("./routers/class.router")
const userClassRouter = require("./routers/userClass.router")

app.use("/class", classRouter);
app.use("/users", userRouter);
app.use("/quotes", quoteRouter);
app.use("/userClass", userClassRouter)

connect();

app.listen(3000,()=>{
    console.log("listen on port 3000")
})
