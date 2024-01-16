const passwordField = document.getElementById("password");
const togglePassword = document.getElementById("showPassword");

togglePassword.addEventListener("change", () => {
  const type = passwordField.getAttribute("type");
  if (type === "password") {
    passwordField.setAttribute("type", "text");
  } else {
    passwordField.setAttribute("type", "password");
  }
});

togglePassword.addEventListener("change", () => {
  console.log("hello, world");
});
