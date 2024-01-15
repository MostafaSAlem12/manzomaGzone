// const addButton = document.getElementById("add");

// addButton.addEventListener("click", () => {
//   document.getElementById("field").innerHTML += '<input type="text" />';
// });

const person = document.getElementById("person");
const vehicle = document.getElementById("vehicle");

person.addEventListener("change", () => {
  if (person.value !== "") {
    const fieldName = person.options[person.selectedIndex].getAttribute("name");
    document.getElementById(
      "personField"
    ).innerHTML += `<label>${person.value}</label> <input type="text" name="${fieldName}"/><br>`;
  }
});
vehicle.addEventListener("change", () => {
  if (vehicle.value !== "") {
    const fieldName =
      vehicle.options[vehicle.selectedIndex].getAttribute("name");
    document.getElementById(
      "vehicleField"
    ).innerHTML += `<label>${vehicle.value}</label> <input type="text" name="${fieldName}"/><br>`;
  }
});
