/* 
To use: require('./data-access_db.js');

Allows you to create a Data Access Object in one of 3 modes: 'users', 'schedules', and 'shifts'
depending on the information you're trying to access.

Retrieve functions return an array of objects, delete functions

Example usage: 

var dataaccess = require('./data-access_db.js');

var userDAO = dataccess('users');


	Adding: 
	var newUser = {
		firstName: "Ashley",
		lastName: "Smith",
		email: "asmith@umd.edu",
		password: "fsdadefRDfR",
		studentId: "524342432",
		studentLead: false,
		admin: false
	};
 
	userDAO.save(newUser, function(err, res) {
		...
	})

	Print all Email addresses:
	userDAO.retrieveAll(function(err, res){
		res.forEach(function(element) {
			console.log(element.email);
		});
	});


*/


var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//-------------------------------User Model--------------------------------------------------------

var userSchema = new Schema({
	firstName: {type: String, trim: true},
	lastName:  {type: String, trim: true},
	email: {type: String, unique: true},
	password: {type: String, trim: true},
	studentId: {type: String, trim: true},
	studentLead: Boolean,
	admin: Boolean,
}, {collection: 'Users'}); // by default will be in the users collection


//--------ADD, UPDATE
userSchema.methods.add = function(e, callback) {
		var entity = new User(e);
		return entity.save(callback);
};
userSchema.methods.update = function(e, callback) {
		return this.model('User').findByIdAndUpdate(e.id, e, {new: true}).lean().exec(callback);
};

//----- RETRIEVE
userSchema.methods.retrieveAll = function(callback) {
	return this.model('User').find({}).lean().exec(callback);
};


userSchema.methods.retrieveById = function(id, callback) {
	return this.model('User').findById(id).lean().exec(callback);
};

userSchema.methods.retrieveByFirstName = function(first, callback) {
	return this.model('User').find({firstName: first}).lean().exec(callback);
};

userSchema.methods.retrieveByLastName = function(last, callback) {
	return this.model('User').find({lastName:last}).lean().exec(callback);
};

userSchema.methods.retrieveByName = function(fullName, callback) {
	var name = fullName.split(' ');
	return this.model('User').find({firstName: name[0], lastName: name[1]}).lean().exec(callback);
};

userSchema.methods.retrieveByStudentId = function(uid, callback) {
	return this.model('User').find({studentId: uid}).lean().exec(callback);
};

userSchema.methods.retrieveByEmail = function(email, callback) {
	return this.model('User').find({email:email}).lean().exec(callback);
};

userSchema.methods.retrieveAdmins= function(callback) {
	return this.model('User').find({admin: true}).lean().exec(callback);
};

userSchema.methods.retrieveStudentLeads = function(callback) {
	return this.model('User').find({studentLead: true}).lean().exec(callback);
};

userSchema.methods.retrieveStudents = function(callback) {
	return this.model('User').find({admin: false, studentLead: false}).lean().exec(callback);
};


//------- DELETE
userSchema.methods.delete =  function(e) {
		return this.model('User').remove(e).lean().exec();
};

userSchema.methods.deleteAll = function(callback) {
	return this.model('User').remove({}).lean().exec(callback);
};

userSchema.methods.deleteById = function(id, callback) {
	return this.model('User').remove({_id:id}).lean().exec(callback);
};

userSchema.methods.deleteByFirstName = function(first, callback) {
	return this.model('User').remove({firstName: first}).lean().exec(callback);
};

userSchema.methods.deleteByLastName = function(last, callback) {
	return this.model('User').remove({lastName:last}).lean().exec(callback);
};

userSchema.methods.deleteByName = function(fullName, callback) {
	var name = fullName.split(' ');
	return this.model('User').remove({firstName: name[0], lastName: name[1]}).lean().exec(callback);
};

userSchema.methods.deleteByStudentId = function(uid, callback) {
	return this.model('User').remove({studentId: uid}).lean().exec(callback);
};

userSchema.methods.deleteByEmail = function(email, callback) {
	return this.model('User').remove({email:email}).lean().exec(callback);
};

userSchema.methods.deleteAdmins= function(callback) {
	return this.model('User').remove({admin: true}).lean().exec(callback);
};

userSchema.methods.deleteStudentLeads = function(callback) {
	return this.model('User').remove({studentLead: true}).lean().exec(callback);
};

userSchema.methods.deleteStudents = function(callback) {
	return this.model('User').remove({admin: false, studentLead: false}).lean().exec(callback);
};


// Create Model
var User = mongoose.model('User', userSchema);


//--------------------------------------Shift----------------------------------------------------


// Shift Schema
var shiftSchema = new Schema({
	name: {type: String, trim: true},
	shiftStart : {type:Date},
	shiftEnd: {type:Date},
	DOW: {type: String, trim: true},
	currUserid: {type: String, trim: true},
}, {collection: 'Shifts'});


//--------ADD, UPDATE
shiftSchema.methods.add = function(e, callback) {
		var entity = new Shift(e);
		return entity.save(callback);
};
shiftSchema.methods.update = function(e, callback) {
		return this.model('Shift').findByIdAndUpdate(e.id, e, {new: true}).lean().exec(callback);
};


//----- RETRIEVE
shiftSchema.methods.retrieveAll = function(callback) {
	return this.model('Shift').find({}).lean().exec(callback);
};

shiftSchema.methods.retrieveById = function(id, callback) {
	return this.model('Shift').findById(id).lean().exec(callback);
};

shiftSchema.methods.retrieveByName = function(name, callback) {
	return this.model('Shift').find({name:name}).lean().exec(callback);
};

shiftSchema.methods.retrieveByDOW = function(day, callback) {	
	return this.model('Shift').find({DOW: day}).lean().exec(callback);
};

shiftSchema.methods.retrieveByUserId = function(uid, callback) {
	return this.model('Shift').find({currUserid: uid}).lean().exec(callback);
};



///------- DELETE
shiftSchema.methods.delete =  function(e) {
		return e.remove(e).lean().exec();
};

shiftSchema.methods.deleteAll = function(callback) {
	return this.model('Shift').remove({}).lean().exec(callback);
};

shiftSchema.methods.deleteById = function(id, callback) {
	return this.model('Shift').remove({_id:id}).lean().exec(callback);
};

shiftSchema.methods.deleteByName = function(name, callback) {
	return this.model('Shift').findAndRemove({name:name}).lean().exec(callback);
};

shiftSchema.methods.deleteByUserId = function(uid, callback) {
	return this.model('Shift').remove({currUserid: uid}).lean().exec(callback);
};


// Shift Model
var Shift = mongoose.model('Shift', shiftSchema);

//-------------------------------Shift Schedule------------------------------------------

// Schema
var shiftScheduleSchema = new Schema({
	name: String,   
	active: Boolean,    
	userId: { type: Schema.Types.ObjectId, ref: 'User'},
    Monday: {
    	index: Number,
    	shifts: [{ type: Schema.Types.ObjectId, ref: 'Shift'}] 
    },  
	Tuesday: {
    	index: Number,
    	shifts: [{ type: Schema.Types.ObjectId, ref: 'Shift'}] 	
    },  
	Wednesday: {
    	index: Number,
    	shifts: [{ type: Schema.Types.ObjectId, ref: 'Shift'}] 
    },  
	Thursday: {
    	index: Number,
    	shifts: [{ type: Schema.Types.ObjectId, ref: 'Shift'}] 	
    },  
	Friday: {
    	index: Number,
    	shifts: [{ type: Schema.Types.ObjectId, ref: 'Shift'}] 	
    }
}, {collection: 'Schedules'});


//--------ADD, UPDATE
shiftScheduleSchema.methods.add = function(e, callback) {
		var entity = new ShiftSchedule(e);
		return entity.save(callback);
};
shiftScheduleSchema.methods.update = function(e, callback) {
		return this.model('ShiftSchedule').findByIdAndUpdate(e.id, e, {new: true}).lean().exec(callback);
};

//----- RETRIEVE

shiftScheduleSchema.methods.retrieveAll = function(callback) {
	return this.model('ShiftSchedule').find({}).lean().exec(callback);
};

shiftScheduleSchema.methods.retrieveById = function(id, callback) {
	return this.model('ShiftSchedule').findById(id).lean().exec(callback);
};

shiftScheduleSchema.methods.retrieveByName = function(name, callback) {
	return this.model('ShiftSchedule').find({name:name}).lean().exec(callback);
};

shiftScheduleSchema.methods.retrieveActiveSchedule = function(callback) {
	return this.model('ShiftSchedule').find({active:true}).lean().exec(callback);
};

shiftScheduleSchema.methods.retrieveInactiveSchedules = function(callback) {
	return this.model('ShiftSchedule').find({active:false}).lean().exec(callback);
};

shiftScheduleSchema.methods.retrieveByUserId = function(id, callback) {
	return this.model('ShiftSchedule').find({userId: id}).lean().exec(callback);
};


//------- DELETE
shiftScheduleSchema.methods.delete =  function(e) {
	return this.model('ShiftSchedule').remove(e).lean().exec();
};

shiftScheduleSchema.methods.deleteAll = function(callback) {
	return this.model('ShiftSchedule').remove({}).lean().exec(callback);
};

shiftScheduleSchema.methods.deleteById = function(id, callback) {
	return this.model('ShiftSchedule').remove({_id:id}).lean().exec(callback);
};

shiftScheduleSchema.methods.deleteByName = function(name, callback) {
	return this.model('ShiftSchedule').remove({name:name}).lean().exec(callback);
};

shiftScheduleSchema.methods.deleteActiveSchedule = function(callback) {
	return this.model('ShiftSchedule').remove({active:true}).lean().exec(callback);
};

shiftScheduleSchema.methods.deleteInactiveSchedules = function(callback) {
	return this.model('ShiftSchedule').remove({active:false}).lean().exec(callback);
};

shiftScheduleSchema.methods.deleteByUserId = function(id, callback) {
	return this.model('ShiftSchedule').remove({userId: id}).lean().exec(callback);
};


// Create Model
var ShiftSchedule = mongoose.model('ShiftSchedule', shiftScheduleSchema);


// ----------------------------------Exports--------------------------------------------

module.exports = function (mode) { // Exports requested Model and all of its methods
	var exp;
	switch(mode.toLowerCase()) {
		case 'users':
		exp = new User(); break;
		case 'schedules':
		exp = new ShiftSchedule(); break;
		case 'shifts':
		exp = new Shift(); break;
		default:
		exp = null; break;
	}
	return exp;
}