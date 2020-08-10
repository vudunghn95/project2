const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userService = require('../services/user.service');

const router = express.Router();

router.get('/',(req,res,next)=>{
    res.clearCookie("token");
    res.render('login',{
        pageTitle : "Trang dang nhap"
    });
});

router.post('/',async (req,res,next)=>{
    let user = await userService.getUserByUsername(req.body.username);
    if(user.length!==0){
        res.user = user;
        next();
    }else{
        return res.json(false);
    }
},(req,res)=>{
    let compare =  bcrypt.compareSync(req.body.password, res.user[0].password);
    if(compare){
        let token = jwt.sign({id : res.user[0]._id}, "secretKey", {expiresIn : "2d"});
        res.cookie("token",token,{maxAge : 1000*60*60*2*24});
        return res.json("Login thanh cong");
    }else{
        return res.json(false);;
    }
});

module.exports = router;