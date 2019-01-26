var bcrypt = require('bcryptjs');
var config = require('../config.json');
var jwt = require('jsonwebtoken');
var User = require('../models/User');
var Note = require('../models/Notes');
var moment = require('moment-timezone');
moment.tz.setDefault("Asia/Kolkata");

exports.show = async (req,res)=>{
	var user = req.authuser;
	const notes = await Note.find({ user_id: user.id }).exec();
	if(notes.length > 0 )
		return res.json({status:1,message:'data loaded',data:notes});
	else
		return res.json({status:0,message:'No notes found',data:notes});
}
exports.create = async (req,res)=>{
	const text = req.body.text;
	if(!text)
		res.json({status:0,message:'please provide text'});
	var user = req.authuser;
	var data={
		user_id:user.id,
		text:text,
		created_at:moment().format("YYYY-MM-DD HH:mm:ss")
	}
	let note = new Note(data);
    note.save(function (err,result) {
        if (err) {
        	console.log(err);
        	return next(err);
        }
        return res.json({status:1,message:'successfully saved note',data:result});
    });
}
exports.update = async (req,res)=>{
	const text = req.body.text;
	const id  = req.params.id;
	if(!text)
		res.json({status:0,message:'please provide text'});
	var user = req.authuser;
	var data={
		user_id:user.id,
		text:text
	}

	const note = await Note.findById(id).exec();

	if(note)
	{
		if(note.user_id != user.id)
			return res.json({status:1,message:'bad request'});
	}

	Note.findByIdAndUpdate(id,{$set: data},function(err,result){
		if(err)
			return next(err);
		else
		{
			return res.json({status:1,message:'successfully updated'});
		}

	})
}
exports.GetById = async (req,res)=>{

	const note = await Note.findById(req.params.id).exec();
	user = req.authuser;
	if(note)
	{
		if(note.user_id != user.id)
			return res.json({status:1,message:'bad request'});
	}
	return res.json(note);

}