var express = require('express');
var router = express.Router();
var  UserModel = require('../model/user')

router.get("/",function(req,res){
    res.render("register")
})
router.post("/",function(req,res){
    //res.render("register")
    //console.log(req.body)
    UserModel.create({
        name:req.body.username,
        email:req.body.email,
        password:req.body.password
    },function(error,info){
        if(!error){
            res.redirect('/')
        }
    })
})

module.exports = router;