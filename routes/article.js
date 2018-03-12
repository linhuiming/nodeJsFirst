var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({dest:'public/uploads/'})

var ArticleModel = require('../model/article')

router.get('/',function(req,res){
    if(req.session.roy){
        res.render('article',{isnew:true})
    }else{
        res.redirect('/login')
    }
})
router.post('/',upload.single('photo'),function(req,res){
    ArticleModel.create({
        author:req.session.roy.name,
        title:req.body.title,
        content:req.body.content,
        filepath:req.file?`/uploads/${req.file.filename}`:``
    },function(error,info){
        if(!error){
            res.redirect('/')
        }
    })
})
router.get('/delete/:id',function(req,res){
   ArticleModel.findByIdAndRemove(req.params.id,function(error,info){
       if(!error){
           res.redirect('/')
       }
   })
})

router.get('/update/:id',function(req,res){
    ArticleModel.find({
        _id:req.params.id
    },function(error,info){
        if(!error){
            res.render('article',{isnew:false,info:info[0]})
        }
    })

})


router.post('/update',function(req,res){
    req.body
    ArticleModel.findByIdAndUpdate(req.body.id,{$set:{
        title:req.body.title,
        content:req.body.content,
    }},function(error,info){
        if(!error){
            res.redirect('/')
        }
    })
})
module.exports = router;

