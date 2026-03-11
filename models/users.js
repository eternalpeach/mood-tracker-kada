const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const { hash } = require('../helpers/password');

// Define the User schema (isian const yang akan disimpan di database)  

const UserSchema = new Schema({
  id: ObjectId,
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  googleId: String
}, { timestamps: true       
});

UserSchema.pre('save', function(next) {
    if (this.isModified('password')) 
        return this.password = hash(this.password)
})

const User = mongoose.model('User', UserSchema);
module.exports = User;


