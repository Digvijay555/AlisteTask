const mongoose = require("mongoose")
const CONNECTION_URL = "mongodb+srv://aliste:aliste123@cluster0.nxfmjkz.mongodb.net/alistedatabase?retryWrites=true&w=majority"


const connetToMongo = () =>{
    mongoose.connect(CONNECTION_URL)
    .then(()=>{console.log('connection successful')})
    .catch((e)=>{
        console.log('no connection')
    })
}

module.exports = connetToMongo;