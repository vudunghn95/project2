const express = require('express');
const bcrypt = require('bcryptjs');

const userService = require('../services/user.service');

const router = express.Router();

router.get('/',(req,res,next)=>{
   res.clearCookie("token");
   res.render('sign-up',{
      pageTitle : 'Sign-up'
   })
});

router.post('/',async (req,res,next)=>{
   let user = await userService.getUserByUsername(req.body.username);
   if(user.length!==0){
      return res.json('User da ton tai');
   }else{
      let obj = {};
        if(!req.body.username){
            return res.json("Username khong duoc de trong");
        }else{obj.username = req.body.username};

        if(!req.body.password){
            return res.json("Password khong duoc de trong");
        }
        if(req.body.email){obj.email = req.body.email};

        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(req.body.password, salt);
        obj.password = hash;   
      let result = await userService.createUser(obj);
      res.json(false);
   }
});

module.exports = router;