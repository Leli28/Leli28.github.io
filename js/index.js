
var change = 70;
var y =0;
var svg = 0;

document.addEventListener("DOMContentLoaded", function() {
    barchart();
  });

function barchart() {
const data = [
    { name: 'A', score: 78 },
    { name: 'B', score: 82 },
    { name: 'C', score: 90 },
  ];
  
  
  const width = 500;
  const height = 450;
  const margin = { top: 50, bottom: 50, left: 50, right: 50 };
  
   svg = d3.select('#d3-container')
    .append('svg')
    .attr('width', width - margin.left - margin.right)
    .attr('height', height - margin.top - margin.bottom)
    .attr("viewBox", [0, 0, width, height]);
  
  const x = d3.scaleBand()
    .domain(d3.range(data.length))
    .range([margin.left, width - margin.right])
    .padding(0.1)
  
   y = d3.scaleLinear()
    .domain([change, 100]) //70 ändern auf 0
    .range([height - margin.bottom, margin.top])
    
   

  svg
    .append("g")
    .attr("fill", 'royalblue')
    .selectAll("rect")
    .data(data.sort((a, b) => d3.descending(a.score, b.score)))
    
    .join("rect")
      .attr("x", (d, i) => x(i))
      
      .attr('y', d => y(margin.bottom))
      .attr('title', (d) => d.score)
      .attr("class", "rect")
      .attr('height', d => height - y(0)) //70 ändern auf 0
      .attr("width", x.bandwidth())
      ;


  
      //.transition()
      //.duration(500)
      //.delay(function(d,i){console.log(i) ; return(i*100)})


      svg.selectAll("rect")
      .transition()
      .ease(d3.easeLinear)
      .duration(800)
      .attr("y", d => y(d.score))
      .attr("height", d => y(change) - y(d.score))
      .delay((d, i) => i * 100);

       
      

  function yAxis(g) {
    g.attr("transform", `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(y).ticks(null, data.format))
      .attr("font-size", '20px')
      
      
  }
  
  function xAxis(g) {
    g.attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickFormat(i => data[i].name))
      .attr("font-size", '20px')
  }


  



  
  svg.append("g").call(xAxis);
  svg.append("g").call(yAxis);
  svg.node();

  
  

}


  

  // Function to change the variable
  function changeVariable() {
    svg.remove();
    console.log("Variable:", change);
    change = 0;
    console.log("Variable changed:", change);
    barchart();
  }