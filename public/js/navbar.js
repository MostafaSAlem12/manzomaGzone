const select = function () {
  this.options[this.selectedIndex].value &&
    (window.location = this.options[this.selectedIndex].value);
};
// const dry = document.getElementById("dry");
// const fresh = document.getElementById("fresh");
const meal = document.getElementById("meal");
// const purchases = document.getElementById("purchases");
const categoriesCrud = document.getElementById("categoriesCrud");
const addAmount = document.getElementById("addAmount");
const reportsNav = document.getElementById("reportsNav");

// dry.onchange = select;
// fresh.onchange = select;
// purchases.onchange = select;
if (categoriesCrud) categoriesCrud.onchange = select;
if (addAmount) addAmount.onchange = select;
reportsNav.onchange = select;
