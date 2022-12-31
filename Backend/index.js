const connetToMongo = require("./db")
const express = require("express")
var cors = require('cors')

connetToMongo();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())

app.use('/api/user',require('./routes/user'));

app.listen(port,()=>{
    console.log(`server is running at port ${port}`)
})