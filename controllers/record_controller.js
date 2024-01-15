const express = require("express");
const Record = require("../models/record");
const plotly = require("plotly")();

const record = (req, res) => {
  res.render("home");
};

const add = (req, res) => {
  const id = req.body.id;
  const date = req.body.date;
  const time = req.body.time;
  let mm, mf, cf, cm, vehicle_type, vehicle_qty;
  if (req.body.mm) {
    mm = parseInt(req.body.mm);
  } else {
    mm = 0;
  }
  if (req.body.mf) {
    mf = parseInt(req.body.mf);
  } else {
    mf = 0;
  }
  if (req.body.cm) {
    cm = parseInt(req.body.cm);
  } else {
    cm = 0;
  }
  if (req.body.cf) {
    cf = parseInt(req.body.cf);
  } else {
    cf = 0;
  }
  if (req.body.markaba) {
    vehicle_type = "مركبة";
    vehicle_qty = req.body.markaba;
  }
  if (req.body.plane) {
    vehicle_type = "طيارة";
    vehicle_qty = req.body.plane;
  }
  if (req.body.lansh) {
    vehicle_type = "لنش";
    vehicle_qty = req.body.lansh;
  }
  const place = req.body.place;
  const record = new Record({
    id: id,
    date: date,
    time: time,
    military_male: mm,
    military_female: mf,
    civilian_male: cm,
    civilian_female: cf,
    vehicle_type: vehicle_type,
    vehicle_qty: vehicle_qty,
    place: place,
  });
  record
    .save()
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};

const show = async (req, res) => {
  const records = await Record.find();
  res.render("show", { records });
};

const search = async (req, res) => {
  const id = req.body.id;
  const date_beg = req.body.date_beg;
  const date_end = req.body.date_end;
  const time_beg = req.body.time_beg;
  const time_end = req.body.time_end;
  const vehicle = req.body.vehicle;
  const query = {};
  if (id) {
    query.id = id;
  }
  if (date_beg && date_end) {
    query.date = {
      $gte: new Date(date_beg),
      $lte: new Date(date_end),
    };
  }
  if (time_beg && time_end) {
    query.time = {
      $gte: time_beg,
      $lte: time_end,
    };
  }
  if (vehicle) {
    query.vehicle_type = vehicle;
  }
  console.log(query);
  const results = await Record.find(query)
    .then((records) => {
      console.log(records);
      res.render("show", { records });
    })
    .catch((err) => console.error(err));
};

// const dashboard = async (req, res) => {
//   try {
//     const result = await Record.aggregate([
//       {
//         $group: {
//           _id: "$vehicle_type",
//           totalQty: { $sum: "$vehicle_qty" },
//         },
//       },
//     ]);

//     console.log(result);

//     // You can render a view or send the result as JSON to the client
//     res.json(result);
//   } catch (error) {
//     console.error(error);
//     // Handle the error appropriately, e.g., send an error response
//     res.status(500).send("Error retrieving dashboard data");
//   }
// };

const dashboard = (req, res) => {
  res.render("dashboard");
};
module.exports = { record, add, show, search, dashboard };
