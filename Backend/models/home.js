const mongoose = require("mongoose")
const {Schema} = mongoose;

const UserDetails = new Schema({
    // name:{
    //     type:String,
    // },
    // phoneNo:{
    //     type:String,
    // },
    // homeId:{
    //     type:Number,
    // }

    homeId:{
        type:Number,
    },
    user:[
        {
            username:{type:String},
            id:{type:Number}
        }
    ]
})

const home = mongoose.model('home',UserDetails);
home.createIndexes();
module.exports = home;