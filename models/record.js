const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    clause: {
      type: String,
      required: true,
    },
    power: {
      type: String,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: Number,
      required: true,
    },
    military_male: {
      type: Number,
      required: true,
    },
    military_female: {
      type: Number,
      required: true,
    },
    civilian_male: {
      type: Number,
      required: true,
    },
    civilian_female: {
      type: Number,
      required: true,
    },
    vehicle: {
      type: String,
      required: true,
    },
    vehicleType: {
      type: String,
      required: true,
    },
    vehicleQty: {
      type: Number,
      required: true,
    },
    place: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const Record = mongoose.model("Record", schema);
module.exports = Record;
