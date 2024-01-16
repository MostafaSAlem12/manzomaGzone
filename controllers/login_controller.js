const express = require("express");
const bcrypt = require("bcrypt");
const Users = require("../models/users");

const login_page = (req, res) => {
  res.render("login", { messages: req.flash("error") });
};

const register_page = (req, res) => {
  res.render("register", { messages: req.flash("error") });
};

const register = async (req, res) => {
  const username = req.body.username;
  const plaintextPassword = req.body.password;
  const confirmPassword = req.body.confirm;
  let readWrite;

  if (req.body.readWrite) {
    readWrite = true;
  } else {
    readWrite = false;
  }

  try {
    const existingUser = await Users.findOne({ username });

    if (existingUser) {
      req.flash("error", "هذا المستخدم موجود بالفعل");
      res.redirect("register");
    } else if (plaintextPassword !== confirmPassword) {
      req.flash("error", "كلمتى المرور لا يتطابقان");
      res.redirect("register");
    } else {
      if (plaintextPassword.length < 12) {
        req.flash("error", "لا يجب ان تقل كلمة المرور عن 12 حرف");
        res.redirect("register");
      } else if (!/[a-zA-Z]/.test(plaintextPassword)) {
        req.flash("error", "يجب ان تحتوي كلمة المرور علي احرف");
        res.redirect("register");
      } else if (!/[A-Z]/.test(plaintextPassword)) {
        req.flash("error", "يجب ان تحتوي كلمة المرور علي احرف كبيرة");
        res.redirect("register");
      } else if (!/[^a-zA-Z0-9]/.test(plaintextPassword)) {
        req.flash("error", "يجب ان تحتوي كلمة المرور علي رموز مميزة");
        res.redirect("register");
      } else {
        const password = await bcrypt.hash(plaintextPassword, 10);

        const user = new Users({ username, password, readWrite });

        await user.save();

        console.log("User registered");
        res.redirect("login");
      }
    }
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).send("Error during registration");
  }
};

const login = async (req, res) => {
  const username = req.body.username;
  const plaintextPassword = req.body.password;

  try {
    const user = await Users.findOne({ username });

    if (user) {
      const passwordMatch = await bcrypt.compare(
        plaintextPassword,
        user.password
      );

      if (passwordMatch) {
        req.session.username = user.username;
        res.redirect("/");
      } else {
        req.flash("error", "كلمة المرور غير صحيحة");
        res.redirect("/login");
      }
    } else {
      req.flash("error", "لا يوجد مستخدم بهذا الأسم");
      res.redirect("/login");
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("Error during login");
  }
};

const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      res.status(500).send("Internal Server Error"); // Handle the error as needed
    } else {
      // Redirect to the login page or any other desired location
      console.log("loggod out");
      res.redirect("/login");
    }
  });
};

module.exports = { login_page, register_page, register, login, logout };
