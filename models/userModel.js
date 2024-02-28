const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema;


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        trim: true,
        unique: true,
        match : [
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                "Please enter a valid emaial",
              ],
    },
    password : {
        type : String,
        required : [true, 'Please add a password'],
        minLength : [6, 'Password must be ap to 6 charachters']
    },
    role : {
        type : String,
        default : 'customer',
        enum : ['customer', 'admin']
    },
    photo: {
        type: String,
        required: [true, "Please add a photo"],
        default: "https://i.ibb.co/4pDNDk1/avatar.png",
      },
      phone: {
        type: String,
        default: "+234",
      },
      address: {
        type: Object,
        // address, state, country
      },

},
{
  timestamps : true,
}
)
 const User = mongoose.model('User', userSchema);
 module.exports = User;
