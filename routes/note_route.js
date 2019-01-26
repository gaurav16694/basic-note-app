var express = require('express');
var router = express.Router();
var User = require('../models/User');
var bcrypt = require('bcryptjs');
var config = require('../config.json');
var jwt = require('jsonwebtoken');
const NoteController = require('../controllers/NoteController');
var CheckAuth = async function (req, res, next) {
   var token = req.headers['x-access-token'] || req.headers['authorization'];
    if (token) {
      if(token.startsWith('Bearer '))
      token = token.slice(7, token.length);
      var decoded = await jwt.verify(token, config.jwt_secret,async function(err,decode){
        if(decode)
        {
       		let user_id = decode.sub;
       		const user  = await User.findById(user_id).exec();
            if(user) 
            	req.authuser = user;
            else
            	res.send({status:0,message:'invalid request'});
             
        }
        else
        	res.json({status:0,message:'invalid token'});
      });
    }
    else
       return res.send({status:0,message:'token not provided'});
  next();
}
router.use(CheckAuth);

router.get('/',NoteController.show);
router.post('/',NoteController.create);
router.post('/:id',NoteController.update);
router.get('/:id',NoteController.GetById);

module.exports = router;
