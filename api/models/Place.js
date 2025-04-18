import mongoose from "mongoose";

const placeSchema = mongoose.Schema({
  title: String,
  address: String,
  photo: String,
  category: {
    type: String,
    enum: ["museum", "park", "skiresort", "other"],
    required: true,
  },
  description: String,
  latitude: Number,
  longitude: Number,
});

const Place = mongoose.model("Place", placeSchema);
export default Place;
