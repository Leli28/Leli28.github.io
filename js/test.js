var change = 70;


var data = [
    {name: 'Alice', math: 73,   science: 62,   language: 54},
    {name: 'Billy', math: 76, science: 34,   language: 85},
    {name: 'Emily', math: 93,   science: 55,   language: 29}
  ];
  
  const margin = { top: 50, bottom: 50, left: 50, right: 50 };
  const width = 500;
  const height = 450;
  
  var svg = d3.select('.chart')
    .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .call(responsivefy)
    .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);
  
  var xScale = d3.scaleBand()
    .domain(data.map(d => d.name))
    .range([0, width])
    .padding(0.2);
  svg
    .append('g')
      .attr('transform', `translate(0, ${height})`)
    .call(d3.axisBottom(xScale));
  
  var yScale = d3.scaleLinear()
    .domain([change, 100]) //change 0 to 70
    .range([height, 0]);
  var yAxis = svg
    .append('g')
    .call(d3.axisLeft(yScale));
  
  function render (subject = 'math') {
    var t = d3.transition().duration(1000);
  
    var update = svg.selectAll('rect')
      .data(data.filter(d => d[subject]), d => d.name);
  
    update.exit()
      .transition(t)
      .attr('y', height)
      .attr('height', 0)
      .remove();
  
    yScale.domain([change, d3.max(data, d => d[subject])]); //change 0 to 70
    yAxis
      .transition(t)
      .delay(1000)
      .call(d3.axisLeft(yScale));
  
    update
      .transition(t)
      .delay(1000)
      .attr('y', d => yScale(d[subject]))
      .attr('height', d => height - yScale(d[subject]));
  
    update
      .enter()
      .append('rect')
      .attr('y', height)
      .attr('height', 0)
      .attr('x', d => xScale(d.name))
      .attr('width', d => xScale.bandwidth())
      .transition(t)
      .delay(update.exit().size() ? 2000 : 0)
      .attr('y', d => yScale(d[subject]))
      .attr('height', d => height - yScale(d[subject]));
  }
  
  render();
  
  function responsivefy(svg) {
    // get container + svg aspect ratio
    var container = d3.select(svg.node().parentNode),
        width = parseInt(svg.style("width")),
        height = parseInt(svg.style("height")),
        aspect = width / height;
  
    // add viewBox and preserveAspectRatio properties,
    // and call resize so that svg resizes on inital page load
    svg.attr("viewBox", "0 0 " + width + " " + height)
        .attr("preserveAspectRatio", "xMinYMid")
        .call(resize);
  
    // to register multiple listeners for same event type,
    // you need to add namespace, i.e., 'click.foo'
    // necessary if you call invoke this function for multiple svgs
    // api docs: https://github.com/mbostock/d3/wiki/Selections#on
    d3.select(window).on("resize." + container.attr("id"), resize);
  
    // get width of container and resize svg to fit it
    function resize() {
        var targetWidth = parseInt(container.style("width"));
        svg.attr("width", targetWidth);
        svg.attr("height", Math.round(targetWidth / aspect));
    }
  }
  







