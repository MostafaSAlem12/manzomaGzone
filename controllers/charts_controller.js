const express = require("express");

const charts_page = (req, res) => {
  res.render("charts", { title: "charts", username: req.session.username });
};

module.exports = charts_page;
