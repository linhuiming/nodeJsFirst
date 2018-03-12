var express = require('express');
var router = express.Router();
var ArticleModel = require('../model/article');


router.get('/:id',function(req,res){
    if(req.session.roy){
        ArticleModel.find({
            _id:req.params.id
        },function(error,info){
            if(!error){
                res.render('details',{info:info[0]});
            }
        })
    }else{
        res.redirect('/login')
    }

})


module.exports = router;
