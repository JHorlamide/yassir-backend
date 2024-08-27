import mongoose from "mongoose";

const airQualitySchema = new mongoose.Schema({
  timestamp: Date,
  pollution: {
    ts: String,
    aqius: Number,
    mainus: String,
    aqicn: Number,
    maincn: String,
  }
}, { timestamps: true });

const airQuality = mongoose.model('AirQuality', airQualitySchema);

export const db = {
  airQuality
}

