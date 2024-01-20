// Get the modals
var modal = document.getElementById("myModal");
var modal1 = document.getElementById("myModal1");

// Get the buttons that open the modals
var btn = document.getElementById("myBtn");
var btn1 = document.getElementById("myBtn1");

// Get the <span> elements that close the modals
var span = document.getElementsByClassName("close");

// Function to open the advanced search modal
btn.onclick = function () {
  modal.style.display = "block";
};

// Function to open the specialized search modal
btn1.onclick = function () {
  modal1.style.display = "block";
};

// Functions to close the modals when clicking on <span> (x)
for (var i = 0; i < span.length; i++) {
  span[i].onclick = function () {
    modal.style.display = "none";
    modal1.style.display = "none";
  };
}

// Function to close the modals when clicking anywhere outside of them
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
  if (event.target == modal1) {
    modal1.style.display = "none";
  }
};
function convertDigitsToArabic(str) {
  return str.replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[d]);
}

// Get the current date
var currentDate = new Date();
var day = convertDigitsToArabic(currentDate.getDate().toString());
var month = convertDigitsToArabic((currentDate.getMonth() + 1).toString()); // Month is zero-based
var year = convertDigitsToArabic(currentDate.getFullYear().toString());

// Format the date as needed
var formattedDate = `التــــــــاريـــــــــــــــخ  ${day}-${month}-${year}`;

// Update the HTML element with the formatted date
document.getElementById("currentDate").innerText = formattedDate;

document.getElementById("downloadPdf").addEventListener("click", function () {
  var element = document.getElementById("pdf"); // Replace 'pdf' with the ID of the element you want to convert

  html2pdf(element, {
    filename: `المنطقة-ج-${day}-${month}-${year}.pdf`,
    jsPDF: {
      unit: "in",
      format: "letter",
      orientation: "landscape",
      putOnlyUsedFonts: true,
      precision: 32,
    }, // Set orientation to 'landscape'
    html2canvas: { scale: 2 },
  });
});
