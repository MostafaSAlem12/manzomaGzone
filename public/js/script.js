// const addButton = document.getElementById("add");

// addButton.addEventListener("click", () => {
//   document.getElementById("field").innerHTML += '<input type="text" />';
// // });

// const person = document.getElementById("person");
// const vehicle = document.getElementById("vehicle");

// person.addEventListener("change", () => {
//   if (person.value !== "") {
//     const fieldName = person.options[person.selectedIndex].getAttribute("name");
//     document.getElementById(
//       "personField"
//     ).innerHTML += `<label for="${fieldName}" >${person.value}</label> <input type="text" class="form-control" name="${fieldName}"/><br>`;
//   }
// });
// vehicle.addEventListener("change", () => {
//   if (vehicle.value !== "") {
//     const fieldName =
//       vehicle.options[vehicle.selectedIndex].getAttribute("name");
//     document.getElementById(
//       "vehicleField"
//     ).innerHTML = `<label for="${fieldName}">${vehicle.value}</label> <input type="text" class="form-control" name="${fieldName}"/><br>`;
//   }
// });

var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var no = document.getElementById("no");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

no.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

var id_field = document.getElementById("id");
var id_check = document.getElementById("id_check");
id_field.addEventListener("input", function () {
  id_check.innerHTML = "رقم البند: " + id_field.value;
});

var clause_field = document.getElementById("clause");
var clause_check = document.getElementById("clause_check");
clause_field.addEventListener("input", function () {
  clause_check.innerHTML = "البند: " + clause_field.value;
});

var power_field = document.getElementById("power");
var power_check = document.getElementById("power_check");
power_field.addEventListener("change", function () {
  var selectedOption = power_field.options[power_field.selectedIndex].value;
  power_check.innerHTML = "القوات: " + selectedOption;
});

var date_field = document.getElementById("date");
var date_check = document.getElementById("date_check");
date_field.addEventListener("input", function () {
  date_check.innerHTML = "التاريخ: " + date_field.value;
});

var time_field = document.querySelector("#time");
var time_check = document.querySelector("#time_check");
time_field.addEventListener("input", function () {
  time_check.innerHTML = "سعت: " + time_field.value;
});

var mm_field = document.querySelector("#mm");
var mm_check = document.querySelector("#mm_check");
mm_field.addEventListener("input", function () {
  mm_check.innerHTML = "ذكر عسكري: " + mm_field.value;
});

var mf_field = document.querySelector("#mf");
var mf_check = document.querySelector("#mf_check");
mf_field.addEventListener("input", function () {
  mf_check.innerHTML = "انثى عسكري: " + mf_field.value;
});

var cm_field = document.querySelector("#cm");
var cm_check = document.querySelector("#cm_check");
cm_field.addEventListener("input", function () {
  cm_check.innerHTML = "ذكر مدنى: " + cm_field.value;
});

var cf_field = document.querySelector("#cf");
var cf_check = document.querySelector("#cf_check");
cf_field.addEventListener("input", function () {
  cf_check.innerHTML = "انثى مدنى: " + cf_field.value;
});

var vehicle_field = document.querySelector("#vehicle");
var vehicle_check = document.querySelector("#vehicle_check");
vehicle_field.addEventListener("change", function () {
  var selectedOption = vehicle_field.options[vehicle_field.selectedIndex].value;
  vehicle_check.innerHTML = "المعدة: " + selectedOption;
});

var vehicleType_field = document.querySelector("#vehicleType");
var vehicleType_check = document.querySelector("#vheicleType_check");
vehicleType_field.addEventListener("input", function () {
  vehicleType_check.innerHTML = "نوع المعدة: " + vehicleType_field.value;
});

var vehicleQty_field = document.querySelector("#vehicleQty");
var vehicleQty_check = document.querySelector("#vheicleQty_check");
vehicleQty_field.addEventListener("input", function () {
  vehicleQty_check.innerHTML = "العدد: " + vehicleQty_field.value;
});

var place_field = document.getElementById("place");
var place_check = document.getElementById("place_check");
place_field.addEventListener("input", function () {
  place_check.innerHTML = "المنطقة: " + place_field.value;
});

var subject_field = document.querySelector("#subject");
var subject_check = document.querySelector("#subject_check");
subject_field.addEventListener("input", function () {
  subject_check.innerHTML = "البيان: " + subject_field.value;
});
