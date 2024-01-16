const mealSelect = document.getElementById("meal");
const addBtn = document.getElementById("addBtn");
const subBtn = document.getElementById("subBtn");
const fieldList = document.getElementById("fieldList");
const submitBtn = document.getElementById("submitBtn");
const categories = JSON.parse(document.getElementById("categoriesField").value);

const list = fieldList.getElementsByTagName("li");

mealSelect.addEventListener("change", function (e) {
  while (fieldList.firstChild) {
    fieldList.removeChild(fieldList.firstChild);
  }
  submitBtn.disabled = false;
  subBtn.disabled = true;
  addBtn.disabled = false;
  const li = document.createElement("li");
  li.innerHTML += `<div class="form-group form-floating mb-3 col-sm">
                          <select class="form-select" name="categoryItems[${length}][name]" id="name${length}" required>
                              <option value="" hidden>اسم الصنف</option>
                              ${categoriesLooping()}
                          </select>
                          <label for="name${length}">اسم الصنف</label>
                      </div>

                       <div class="form-group form-floating mb-3 col-sm">
                          <input type="number" min="0.25" step="0.25" id="rate${length}" class="form-control"  name="categoryItems[${length}][rate]" placeholder="صرفية الفرد" readonly>
                          <label for="rate${length}">صرفية الفرد</label>
                      </div>                     

                      <div class="form-group form-floating mb-3 col-sm">
                          <input type="number" min="0.25" step="0.25" id="amount${length}" class="form-control"  name="categoryItems[${length}][amount]" placeholder="الكمية بالكيلو" readonly>
                          <label for="amount${length}">الكميةالموجودة</label>
                      </div>

                      
                      <div class="form-group form-floating mb-3 col-sm">
                          <input type="number" min="0.25" step="0.25" id="amountChecked${length}" class="form-control"  name="categoryItems[${length}][amountChecked]" placeholder="الكمية المصروفة بالكيلو" required>
                          <label for="amountChecked${length}">الكمية المصروفة</label>
                      </div>
                    `;
  li.setAttribute("class", "row");
  fieldList.appendChild(li);
  refreshList(0);
});

window.onload = function () {
  // for (let i = 0; i < list.length; i++) {
  //   $("#name" + i).on("change", (e) => {
  //     console.log(e);
  //     const amount = JSON.parse($("#name" + i).val()).amount;
  //     // const unit = JSON.parse($("#name").val()).unit;
  //     const amountChecked = $("#amountChecked" + i).val();
  //     $("#amount" + i).val(amount);
  //     // $("#unit").val(unit);
  //     $("#amountChecked" + i).attr("max", amount);
  //     if (amountChecked && amountChecked > amount) {
  //       $("#amountChecked" + i).val(amount);
  //     }
  //   });
  // }
  submitBtn.disabled = true;
  addBtn.disabled = true;
  refreshList(0);
  const length = fieldList.getElementsByTagName("li").length;
  if (length > 1) {
    subBtn.disabled = false;
  } else {
    subBtn.disabled = true;
  }
};
// const add = function (itemLength) {
//   itemLength++;
// };
addBtn.addEventListener("click", function () {
  const length = fieldList.getElementsByTagName("li").length;

  const li = document.createElement("li");
  li.innerHTML += `<div class="form-group form-floating mb-3 col-sm">
                          <select class="form-select" name="categoryItems[${length}][name]" id="name${length}" required>
                              <option value="" hidden>اسم الصنف</option>
                              ${categoriesLooping()}
                          </select>
                          <label for="name${length}">اسم الصنف</label>
                      </div>

                      <div class="form-group form-floating mb-3 col-sm">
                          <input type="number" min="0.25" step="0.25" id="rate${length}" class="form-control"  name="categoryItems[${length}][rate]" placeholder="صرفية الفرد" readonly>
                          <label for="rate${length}">صرفية الفرد</label>
                      </div>

                      <div class="form-group form-floating mb-3 col-sm">
                          <input type="number" min="0.25" step="0.25" id="amount${length}" class="form-control"  name="categoryItems[${length}][amount]" placeholder="الكمية بالكيلو" readonly>
                          <label for="amount${length}">الكميةالموجودة</label>
                      </div>

                      
                      <div class="form-group form-floating mb-3 col-sm">
                          <input type="number" min="0.25" step="0.25" id="amountChecked${length}" class="form-control"  name="categoryItems[${length}][amountChecked]" placeholder="الكمية المصروفة بالكيلو" required>
                          <label for="amountChecked${length}">الكمية المصروفة</label>
                      </div>
                    `;
  li.setAttribute("class", "row");
  fieldList.appendChild(li);
  if (fieldList.getElementsByTagName("li").length > 1) {
    subBtn.disabled = false;
  } else {
    subBtn.disabled = true;
  }
  refreshList(fieldList.getElementsByTagName("li").length - 1);
});

subBtn.addEventListener("click", function () {
  const length = fieldList.getElementsByTagName("li").length;

  if (length > 1) {
    fieldList.removeChild(fieldList.lastElementChild);
  }
  if (fieldList.getElementsByTagName("li").length > 1) {
    subBtn.disabled = false;
  } else {
    subBtn.disabled = true;
  }
});

function categoriesLooping() {
  let list = [];
  console.log(categories);
  const filteredCategories = categories.filter((c) => {
    console.log(c.meals);
    return c.meals.includes(mealSelect.value);
  });
  console.log(filteredCategories);
  for (let category of filteredCategories) {
    list.push(
      `<option value='${JSON.stringify(category)}'>${category.name}</option>`
    );
  }
  return list;
}

const refreshList = function (i) {
  $("#name" + i).on("change", (e) => {
    const amount = JSON.parse($("#name" + i).val()).amount;
    const rate = JSON.parse($("#name" + i).val()).rate;
    // const unit = JSON.parse($("#name").val()).unit;
    const amountChecked = $("#amountChecked" + i).val();
    $("#amount" + i).val(amount);
    $("#rate" + i).val(rate);
    // $("#unit").val(unit);
    $("#amountChecked" + i).attr("max", amount);
    if (amountChecked && amountChecked > amount) {
      $("#amountChecked" + i).val(amount);
    }
    calculateFromPower(amount, i, rate);
    $("#power").on("input", () => calculateFromPower(amount, i, rate));
  });
};

const calculateFromPower = (amount, i, rate) => {
  const power = $("#power").val() * rate;
  const checkedAmount = Math.min(amount, power);
  $("#amountChecked" + i).val(checkedAmount);
};
