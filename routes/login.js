var express = require('express');
var router = express.Router();
var  UserModel = require('../model/user')

router.get("/",function(req,res){
    res.render("login",{isshowerror:false})
})
router.post("/",function(req,res){
    //res.render("register")
    //console.log(req.body)
    UserModel.find({
        email:req.body.email,
        password:req.body.password
    },function(error,info){
        if(!error){
            if(info.length>0){
                req.session.roy = info[0];
                res.redirect('/')
            }else{
                res.render('login',{isshowerror:true});
            }
        }
    })
})

module.exports = router;