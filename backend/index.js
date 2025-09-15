const express = require('express')
const cors = require('cors')
const connect = require('./mongoDB');

const app = express();
app.use(express.json());
app.use(cors());
const userRouter = require("./routers/user.router")
const qouteRouter = require("./routers/qoute.router")

app.use("/users", userRouter);
app.use("/qoutes", qouteRouter)

connect();

app.listen(3000,()=>{
    console.log("listen on port 3000")
})
