const data = JSON.parse(document.currentScript.getAttribute("data-data"));
const mc = JSON.parse(
  document.currentScript.getAttribute("military-civilian-data")
);

const totalCount = mc.military + mc.civilian;

// Set up the SVG container
const svg = d3
  .select("#bar-chart")
  .append("svg")
  .attr("width", 400)
  .attr("height", 200);

// Create bars
svg
  .selectAll("rect")
  .data(data)
  .enter()
  .append("rect")
  .attr("x", (d, i) => i * 120)
  .attr("y", (d) => 200 - d.totalQty * 10)
  .attr("width", 100)
  .attr("height", (d) => d.totalQty * 10)
  .attr("fill", "steelblue");

// Create labels
svg
  .selectAll("text")
  .data(data)
  .enter()
  .append("text")
  .text((d) => d.totalQty)
  .attr("x", (d, i) => i * 120 + 50)
  .attr("y", (d) => 200 - d.totalQty * 10 - 5)
  .attr("text-anchor", "middle")
  .attr("fill", "black");

svg
  .selectAll(".bar-title")
  .data(data)
  .enter()
  .append("text")
  .text((d) => d._id)
  .attr("x", (d, i) => i * 120 + 50)
  .attr("y", 195)
  .attr("text-anchor", "middle")
  .attr("class", "bar-title")
  .attr("fill", "black");

//Military civilian
const pieSvg = d3
  .select("#pie-chart")
  .append("svg")
  .attr("width", 200)
  .attr("height", 200)
  .append("g")
  .attr("transform", "translate(100,100)");

// Set up D3 pie chart layout
const pie = d3.pie();

// Generate the pie chart data
const pieData = pie([mc.military / totalCount, mc.civilian / totalCount]);

// Set up D3 arc generator
const arc = d3.arc().innerRadius(0).outerRadius(100);

// Create arcs for each pie slice
const arcs = pieSvg
  .selectAll("arc")
  .data(pieData)
  .enter()
  .append("g")
  .attr("class", "arc");

// Append path elements for each arc
arcs
  .append("path")
  .attr("d", arc)
  .attr("fill", (d, i) => (i === 0 ? "green" : "yellow"));

// Append text labels for each arc
arcs
  .append("text")
  .attr("transform", (d) => `translate(${arc.centroid(d)})`)
  .attr("text-anchor", "middle")
  .text((d, i) => (i === 0 ? "عسكري" : "مدني"));
