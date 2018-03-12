var express = require('express');
var router = express.Router();
var ArticleModel = require('../model/article');

/* GET home page. */
router.get('/', function(req, res, next) {
    if(req.session.roy){

        ArticleModel.find({},function(error,info){
            if(!error){
                res.render('index',{who:req.session.roy.name,list:info})
            }
        })

    }else{
      res.redirect('/login')
    }
});
router.get('/logout',function(req,res){
  req.session.destroy(function(error){
      if(!error){
        res.redirect('/login')
      }
  })
})

module.exports = router;
