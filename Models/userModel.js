import mongoose from "mongoose";

const userschema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique : true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role:{
    type:String
  }
});

const user = mongoose.model("User", userschema);
export default user;
