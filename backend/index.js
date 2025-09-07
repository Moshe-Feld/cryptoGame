const express = require('express')
const cors = require('cors')
const connect = require('./mongoDB');

const app = express();
app.use(express.json());
app.use(cors());
const userRouter = require("./routers/user.router")

app.use("/users", userRouter);

connect();

app.listen(3000,()=>{
    console.log("listen on port 3000")
})
