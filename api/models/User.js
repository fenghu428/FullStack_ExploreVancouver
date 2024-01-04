import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  favorites: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Place' }
  ],
});

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
