const ranks = {
  rotba: [
    "لواء أح",
    "لواء",
    "عميد أح",
    "عميد",
    "عقيد أح",
    "عقيد",
    "مقدم أح",
    "مقدم",
    "رائد أح",
    "رائد",
    "نقيب",
    "ملازم أول",
    "ملازم",
  ],
  drga: ["مساعد أول", "مساعد", "رقيب أول", "رقيب", "عريف", "جندى"],
};

const level = document.querySelector("#level");
const ranksList = document.querySelector("#ranksList");
const ranksListLabel = document.querySelector("#ranksListLabel");
const rank_list_div = document.querySelector("#rank_list_div");

function addOption(parent, parentLabel, text, ranks, value) {
  deleteNodes(parent);
  parentLabel.innerText = text;
  for (let i = 0; i < ranks.length; i++) {
    const option = document.createElement("option");
    option.innerText = ranks[i];
    option.value = i + value;
    parent.appendChild(option);
  }
}

level.addEventListener("change", (e) => {
  const hidden = rank_list_div.classList.contains("hidden");

  if (
    (level.value === "1" || level.value === "2" || level.value === "14") &&
    hidden
  )
    rank_list_div.classList.toggle("hidden");
  if (
    level.value !== "1" &&
    level.value !== "2" &&
    level.value !== "14" &&
    !hidden
  )
    rank_list_div.classList.toggle("hidden");

  if (level.value === "1") {
    addOption(ranksList, ranksListLabel, "أختر الرتبة: ", ranks.rotba, 1);
  } else if (level.value === "2") {
    addOption(ranksList, ranksListLabel, "أختر الدرجة: ", ranks.drga, 14);
  } else if (level.value === "19") {
    addOption(ranksList, ranksListLabel, "أختر الدرجة: ", ["جندى"], 19);
  } else {
    deleteNodes(ranksList);
  }
});

function deleteNodes(parentItem) {
  while (parentItem.childElementCount !== 0) {
    ranksList.remove(ranksList.childNodes);
  }
}
