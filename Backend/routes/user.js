const express = require("express")
const router = express.Router();
const userDetails = require('../models/home');
const axios = require('axios');

router.get('/getuser/:homeId',async(req,res)=>{
    try {
        const users = await userDetails.find({homeId:req.params.homeId})
        res.json(users[0]);
    } catch (error) {
        
    }
})
router.post('/saveuser',async(req,res)=>{
    try {
        const homeId = req.body.homeId;
        const username = req.body.user[0].username;
        const id = req.body.user[0].id;

        const data = await userDetails.find({homeId:homeId})
        console.log(data);
        if(data.length>0)
        {
            const updateUser = await userDetails.updateOne({homeId:homeId},{$push:{"user":{username:username,id:id}}})
            res.json(updateUser);
        }
        else{
        const users = new userDetails({
           homeId,
           user:[
            {
                username:username,
                id:id,
            }
           ]
        })

        const saveUser = await users.save()
        res.json(saveUser)
        }
        
        // res.json(data);
    } catch (error) {
        res.status(500).send("Internal Server Error "+error)
        
    }
})

router.delete('/deleteuser/:homeId/:id',async(req,res)=>{
    try {
        let homeId = req.params.homeId
        // let users = await userDetails.find({homeId:homeId})
        const updateUser = await userDetails.updateMany({homeId:homeId},{$pull:{"user":{id:req.params.id}}})
        res.json(updateUser);
    } catch (error) {
    res.status(500).send("Internal Server Error "+error)
        
    }
})


module.exports = router