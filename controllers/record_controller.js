const express = require("express");
const Record = require("../models/record");
const plotly = require("plotly")();

const record = (req, res) => {
  res.render("home", {
    username: req.session.username,
    title: "home",
  });
};

const add = (req, res) => {
  const id = req.body.id;
  const clause = req.body.clause;
  const power = req.body.power;
  const date = req.body.date;
  const time = parseInt(req.body.time);
  const mm = parseInt(req.body.mm);
  const mf = parseInt(req.body.mf);
  const cm = parseInt(req.body.cm);
  const cf = parseInt(req.body.cf);
  const vehicle = req.body.vehicle;
  const vehicleType = req.body.vehicleType;
  const vehicleQty = req.body.vehicleQty;
  const place = req.body.place;
  const subject = req.body.subject;

  const record = new Record({
    id,
    clause,
    power,
    date,
    time,
    military_male: mm,
    military_female: mf,
    civilian_male: cm,
    civilian_female: cf,
    vehicle,
    vehicleType,
    vehicleQty,
    place,
    subject,
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
  try {
    const recordsPerPage = 10;
    const currentPage = req.query.page || 1;
    const startIndex = (currentPage - 1) * recordsPerPage;

    const records = await Record.find().skip(startIndex).limit(recordsPerPage);

    const username = req.session.username;
    const totalRecords = await Record.countDocuments();
    const totalPages = Math.ceil(totalRecords / recordsPerPage);
    const endIndex = Math.min(
      startIndex + recordsPerPage - 1,
      totalRecords - 1
    );

    res.render("show", {
      records,
      username,
      title: "show",
      specialSearch: false,
      recordsPerPage,
      totalPages,
      currentPage,
      startIndex,
      endIndex,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const search = async (req, res) => {
  try {
    const username = req.session.username;
    const id = req.body.id;
    const power = req.body.power;
    const date_beg = req.body.date_beg;
    const date_end = req.body.date_end;
    const time_beg = req.body.time_beg;
    const time_end = req.body.time_end;
    const vehicle = req.body.vehicle;
    const query = {};

    if (id) {
      query.id = id;
    }
    if (power) {
      query.power = power;
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
      query.vehicle = vehicle;
    }

    const recordsPerPage = 10;
    const currentPage = req.query.page || 1;
    const startIndex = (currentPage - 1) * recordsPerPage;

    const totalRecords = await Record.countDocuments(query);
    const totalPages = Math.ceil(totalRecords / recordsPerPage);
    const endIndex = Math.min(
      startIndex + recordsPerPage - 1,
      totalRecords - 1
    );

    const records = await Record.find(query)
      .skip(startIndex)
      .limit(recordsPerPage);

    console.log(query);
    console.log(records);
    res.render("show", {
      records,
      username,
      title: "show",
      specialSearch: false,
      recordsPerPage,
      currentPage,
      totalPages,
      startIndex,
      endIndex,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const dashboard = async (req, res) => {
  try {
    const result = await Record.aggregate([
      {
        $group: {
          _id: "$vehicle_type",
          totalQty: { $sum: "$vehicle_qty" },
        },
      },
    ]);

    const mc_result = await Record.aggregate([
      {
        $group: {
          _id: null,
          TotalMilitaryMale: { $sum: "$military_male" },
          TotalMilitaryFemale: { $sum: "$military_female" },
          TotalCivilianMale: { $sum: "$civilian_male" },
          TotalCivilianFemale: { $sum: "$civilian_female" },
        },
      },
    ]);

    const military_civilian = {
      military:
        mc_result[0].TotalMilitaryMale + mc_result[0].TotalMilitaryFemale,
      civilian:
        mc_result[0].TotalCivilianMale + mc_result[0].TotalCivilianFemale,
    };

    const uniqueIds = await Record.distinct("id");
    const uniqueId = uniqueIds.length;

    console.log(uniqueId);
    res.render("dashboard", {
      data: JSON.stringify(result),
      military_civilian: JSON.stringify(military_civilian),
      uniqueId,
    });

    // You can render a view or send the result as JSON to the client
  } catch (error) {
    console.error(error);
    // Handle the error appropriately, e.g., send an error response
    res.status(500).send("Error retrieving dashboard data");
  }
};

const specialSearch = async (req, res) => {
  try {
    const date_beg = req.body.date_beg;
    const date_end = req.body.date_end;
    const time_beg = parseInt(req.body.time_beg);
    const time_end = parseInt(req.body.time_end);
    const query = {};

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
    const vehicleResults = await Record.aggregate([
      {
        $match: query,
      },
      {
        $group: {
          _id: "$vehicle", // Group by all documents
          totalVehicleQty: { $sum: "$vehicleQty" },
        },
      },
    ]);

    const PersonResults = await Record.aggregate([
      {
        $match: query,
      },
      {
        $group: {
          _id: null,
          military_male: { $sum: "$military_male" },
          military_female: { $sum: "$military_female" },
          civilian_male: { $sum: "$civilian_male" },
          civilian_female: { $sum: "$civilian_female" },
        },
      },
    ]);

    const records = await Record.find();

    function convertDateToArabicNumbers(input) {
      // Map English numbers to Arabic numbers
      const map = {
        0: "٠",
        1: "١",
        2: "٢",
        3: "٣",
        4: "٤",
        5: "٥",
        6: "٦",
        7: "٧",
        8: "٨",
        9: "٩",
      };

      // Use regular expression to replace English numbers with Arabic numbers
      // Use regular expression to replace English numbers with Arabic numbers
      const converted = input.replace(/\d/g, function (match) {
        return map[match];
      });

      // Split the date into parts
      const parts = converted.split("-");

      // Reverse the date parts and join them back
      const reversed = parts.reverse().join("-");

      return reversed;
    }
    let date = {};
    if (date_beg && date_end) {
      date["date_beg"] = convertDateToArabicNumbers(date_beg);
      date["date_end"] = convertDateToArabicNumbers(date_end);
    }

    const vehicle = vehicleResults.reduce((result, item) => {
      result[item._id] = item.totalVehicleQty;
      return result;
    }, {});

    function convertEnglishToArabicNumbers(inputObject) {
      const englishToArabicMap = {
        0: "٠",
        1: "١",
        2: "٢",
        3: "٣",
        4: "٤",
        5: "٥",
        6: "٦",
        7: "٧",
        8: "٨",
        9: "٩",
      };

      const resultObject = {};

      for (const key in inputObject) {
        if (inputObject.hasOwnProperty(key)) {
          const value = inputObject[key];

          // Check if the value is null
          if (value === null) {
            resultObject[key] = null;
          } else {
            const englishNumber = value.toString();
            let arabicNumber = "";

            // Convert each digit in the English number
            for (let i = 0; i < englishNumber.length; i++) {
              const digit = englishNumber[i];
              arabicNumber += englishToArabicMap[digit];
            }

            resultObject[key] = arabicNumber;
          }
        }
      }

      return resultObject;
    }

    const vehicle_ar = convertEnglishToArabicNumbers(vehicle);
    console.log(PersonResults[0]);
    const PersonResults_ar = convertEnglishToArabicNumbers(PersonResults[0]);

    res.render("show", {
      vehicle: vehicle_ar,
      PersonResults: PersonResults_ar,
      title: "show",
      specialSearch: true,
      username: req.session.username,
      records,
      date,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { record, add, show, search, dashboard, specialSearch };
