// Define data
const data = [10, 20, 30, 40, 50];

// Define SVG dimensions
const svgWidth = 500, svgHeight = 300;

// Define bar dimensions
const barWidth = svgWidth / data.length;

// Create SVG element
const svg = d3.select('#chart')
  .attr('width', svgWidth)
  .attr('height', svgHeight);

// Create bars
svg.selectAll('rect')
  .data(data)
  .enter()
  .append('rect')
  .attr('x', (d, i) => i * barWidth)
  .attr('y', (d) => svgHeight - d)
  .attr('width', barWidth - 1)
  .attr('height', (d) => d);

  function myFunction() {
    document.getElementById("demo").innerHTML = "Paragraph changed.";
  }
