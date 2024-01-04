import mongoose from 'mongoose';

const placeSchema = mongoose.Schema({
    title: String,
    address: String,
    photo: String,
    category: {
        type: String,
        enum: ['museum', 'park', 'skiresort', 'other'],
        required: true
    }
});

const Place = mongoose.model('Place', placeSchema);
export default Place;
