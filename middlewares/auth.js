const Auth = (req, res, next) => {
  const username = req.session.username;
  if (!username && req.url !== "/login" && req.url !== "/register")
    return res.redirect("/login");
  if (username && (req.url === "/login" || req.url === "/register"))
    return res.redirect("/");

  next();
};
module.exports = Auth;
