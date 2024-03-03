require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { generatePath } = require('react-router-dom');
const jwt = require('jsonwebtoken');


const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String
  },
  phone: {
    type: String,
    required: true
  },
  admin: {
    type: Boolean,
    default: false
  },
  favorites: {
    type: Array,
    default: null
  },
  tokens: [
    {
      token: {
        type: String,
        required: true
      }
    }
  ]
}, { versionKey: false });

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password") && !this.isNew) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next();
  } catch (error) {
    return next(error);
  }
});


UserSchema.methods.generateAuthToken = async function () {
  try {
    
    let token = jwt.sign({ _id: this._id }, process.env.JWT_KEY);
    console.log("JWT_KEY:", process.env.JWT_KEY);
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token; 
  } catch (err) {
    console.log("Token error"+err);
  }
}

const User = mongoose.model('User', UserSchema);
module.exports = User;  