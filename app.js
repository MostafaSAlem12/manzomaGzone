const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("connect-flash");
const Auth = require("./middlewares/auth");

const {
  record,
  add,
  show,
  search,
  dashboard,
} = require("./controllers/record_controller");

const {
  login_page,
  register_page,
  register,
  login,
  logout,
} = require("./controllers/login_controller");

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(express.json());
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 365 * 24 * 60 * 60 * 1000, // Set to a high value or Infinity (milliseconds)
    },
  })
);
app.use(flash());

mongoose
  .connect("mongodb://127.0.0.1:27017/G")
  .then(() => {
    console.log("db connected...");
  })
  .catch((err) => console.log(err));

app.get("/", Auth, record);
app.get("/show", Auth, show);
app.get("/dashboard", Auth, dashboard);
app.get("/login", Auth, login_page);
app.get("/register", Auth, register_page);

app.post("/add", add);
app.post("/search", search);
app.post("/register", register);
app.post("/login", login);
app.post("/logout", logout);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
