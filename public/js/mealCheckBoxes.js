const nameField = document.getElementById("id");
const breakFast = document.getElementById("breakFast");
const lunch = document.getElementById("lunch");
const dinner = document.getElementById("dinner");
const submitBtn = document.getElementById("submitBtn");

window.onload = () => {
  submitBtn.disabled = !breakFast.checked && !lunch.checked && !dinner.checked;
};

if (nameField) {
  nameField.addEventListener("change", () => {
    submitBtn.disabled =
      !breakFast.checked && !lunch.checked && !dinner.checked;
  });
}
breakFast.addEventListener("change", function (e) {
  submitBtn.disabled = !breakFast.checked && !lunch.checked && !dinner.checked;
});
lunch.addEventListener("change", function (e) {
  submitBtn.disabled = !breakFast.checked && !lunch.checked && !dinner.checked;
});
dinner.addEventListener("change", function (e) {
  submitBtn.disabled = !breakFast.checked && !lunch.checked && !dinner.checked;
});
