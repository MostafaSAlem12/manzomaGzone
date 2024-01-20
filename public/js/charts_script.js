r1c1 = document.getElementById("r1c1");
r1c2 = document.getElementById("r1c2");
r1c3 = document.getElementById("r1c3");

var data = [
  {
    x: ["طائرة", "ماركبة", "لنش"],
    y: [5, 3, 9],
    type: "bar",
    marker: {
      color: ["#675353", "#a2c1e5", "#8e82d0"], // Replace with your desired colors
    },
  },
];

var layout = {
  title: "المعدات",
  paper_bgcolor: "rgba(0,0,0,0)",
  plot_bgcolor: "rgba(0,0,0,0)",
};

Plotly.newPlot(r1c1, data, layout);

var data1 = [
  {
    labels: ["ذكري عسكري", "ذكر مدني", "انثى مدنى", "انثى عسكرى"],
    values: [20, 14, 23, 18],
    type: "pie",
    textinfo: "label+percent",
    insidetextorientation: "radial",
    marker: {
      colors: ["#675353", "#a2c1e5", "#8e82d0", "	#9c4848"],
    },
  },
];
var layout1 = {
  title: "الأفراد",
  paper_bgcolor: "rgba(0,0,0,0)",
  plot_bgcolor: "rgba(0,0,0,0)",
};
Plotly.newPlot(r1c2, data1, layout1);

var data2 = [
  {
    x: ["جوية", "بحرية", "برية"],
    y: [20, 15, 9],
    type: "bar",
    marker: {
      color: ["#0D1321", "#FFEDDF", "#AFE0CE"], // Replace with your desired colors
    },
  },
];
var layout2 = {
  title: "القوات",
  paper_bgcolor: "rgba(0,0,0,0)",
  plot_bgcolor: "rgba(0,0,0,0)",
};
Plotly.newPlot(r1c3, data2, layout2);
