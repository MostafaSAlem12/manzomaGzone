$("#id").on("change", (e) => {
  const unit = JSON.parse($("#id").val()).unit;
  const rate = JSON.parse($("#id").val()).rate;
  const meals = JSON.parse($("#id").val()).meals;
  const breakFast = meals.includes("الفطار");
  const lunch = meals.includes("الغداء");
  const dinner = meals.includes("العشاء");
  $("#unit").val(unit);
  $("#breakFast").prop("checked", breakFast);
  $("#lunch").prop("checked", lunch);
  $("#dinner").prop("checked", dinner);
  $("#rate").val(rate);
});
