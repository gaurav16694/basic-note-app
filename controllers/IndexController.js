var bcrypt = require('bcryptjs');
var config = require('../config.json');
var User = require('../models/User');
var jwt = require('jsonwebtoken');
var moment = require('moment-timezone');
moment.tz.setDefault("Asia/Kolkata");


exports.login = async (req,res)=>{

	var email = req.body.email;
	var password = req.body.password;
	if(!email)
		return res.json({status:0,message:'invalid password'});
	if(!password)
		return res.json({status:0,message:'invalid password'});

	 const user = await User.findOne({ email: email });
	 if(!user)
	 {
	 	return res.json({status:0,message:'user does not exist'});
	 }
     else if(bcrypt.compareSync(password,user.password)) {
        const token = jwt.sign({ sub: user.id }, config.jwt_secret);
        return res.json({status:1,message:'sucessfully login',token:token});
    }
    else
    {
    	return res.json({status:0,message:'invalid password'});
    }
}
exports.register = async (req,res)=>{

	if(!req.body.email)
		return res.json({status:0,message:'please provide email'});
	if(!req.body.password)
		return res.json({status:0,message:'please provide password'});

	const check = await User.findOne({ email: req.body.email });
	 if(check)
	 {
	 	return res.json({status:0,message:'email already there'});
	 }
	var salt = bcrypt.genSaltSync(10);
	var data={
		email:req.body.email,
		password:bcrypt.hashSync(req.body.password,salt),
		created_at:moment().format("YYYY-MM-DD HH:mm:ss")
	}
	let user = new User(data);
    user.save(function (err,result) {
        if (err) {
            return next(err);
        }
        return res.json({status:1,message:'sucessfully registered'});
    });

}