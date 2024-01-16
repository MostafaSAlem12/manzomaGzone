const passwordField = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");
const confirmField = document.getElementById("confirm");
const toggleConfirm = document.getElementById("toggleConfirm");
const disableFunction = () => {
  return false;
};
togglePassword.addEventListener("change", () => {
  const type = passwordField.getAttribute("type");
  if (type === "password") {
    passwordField.setAttribute("type", "text");
  } else {
    passwordField.setAttribute("type", "password");
  }
});
toggleConfirm.addEventListener("change", () => {
  const type = confirmField.getAttribute("type");
  if (type === "password") {
    confirmField.setAttribute("type", "text");
  } else {
    confirmField.setAttribute("type", "password");
  }
});
togglePassword.addEventListener("copy", disableFunction);
togglePassword.addEventListener("cut", disableFunction);
togglePassword.addEventListener("paste", disableFunction);
togglePassword.addEventListener("selectstart", disableFunction);
togglePassword.addEventListener("drag", disableFunction);
togglePassword.addEventListener("drop", disableFunction);

(function () {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();
