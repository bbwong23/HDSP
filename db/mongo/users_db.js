var mongoose = require('mongoose');

module.exports = mongoose.model('Users', {
    firstName: { type: String},
    lastName: {type: String},
    email: { type: String},
    password: { type: String},
    studentId: { type: String}
}); 