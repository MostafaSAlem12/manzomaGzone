const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    id: {
      type: String,
    },
    power: {
      type: String,
    },
    date: {
      type: Date,
    },
    time: {
      type: Number,
    },
    military_male: {
      type: Number,
    },
    military_female: {
      type: Number,
    },
    civilian_male: {
      type: Number,
    },
    civilian_female: {
      type: Number,
    },
    vehicle_type: {
      type: String,
    },
    vehicle_qty: {
      type: Number,
    },
    place: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false }
);

const Record = mongoose.model("Record", schema);
module.exports = Record;
