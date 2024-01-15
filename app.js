const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const plotly = require("plotly")();

const {
  record,
  add,
  show,
  search,
  dashboard,
} = require("./controllers/record_controller");

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(express.json());
mongoose
  .connect("mongodb://127.0.0.1:27017/G")
  .then(() => {
    console.log("db connected...");
  })
  .catch((err) => console.log(err));

app.get("/", record);
app.get("/show", show);
app.get("/dashboard", dashboard);

app.post("/add", add);
app.post("/search", search);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
