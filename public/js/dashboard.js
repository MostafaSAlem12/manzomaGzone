// Sample data
const data = [
  { _id: "طيارة", totalQty: 7 },
  { _id: "مركبة", totalQty: 2 },
];

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
  .attr("fill", "white");
