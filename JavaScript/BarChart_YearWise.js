console.clear()

var width=700,
	height=200,
	radius=100,
	padding=20;
var margin = {top: 20, right: 20, bottom: 30, left: 50};

console.log("here")
var svg2=d3.select("#BarChartYear").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  g2 = svg2.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var x0 = d3.scaleBand()
    .rangeRound([0, width])
    .paddingInner(0.1);

var x1 = d3.scaleBand()
    .padding(0.05);

var y = d3.scaleLinear()
    .domain([0,3])
    .range([height, 0])
    ;

var y1 = d3.scaleBand()
  
var z = d3.scaleOrdinal()
    .range(["#ca0020","#92c5de","#f4a582","#d5d5d5","#92c5de","#0571b0"]);

var stack = d3.stack()
    // .offset(d3.stackOffsetExpand);
  
d3.csv("Datasets/ourData.csv", function(error, data) {
  if (error) throw error;
  
  data.forEach(function(d){
    d.Value = +d.Value;
  })
  
	console.log("data", data);
  
  x0.domain(data.map(function(d) { return d.State; })); // x_axis
  x1.domain(data.map(function(d) { return d.Category; })) 
    .rangeRound([0, x0.bandwidth()])
  	.padding(0.2);
  
  z.domain(data.map(function(d) { return d.SubCat; })) // labelling for diff parts of stacked bars
  var keys = z.domain()
  
  var groupData = d3.nest()
    .key(function(d) { return d.Category + d.State; }) // d.Cat+d.State
  	.rollup(function(d, i){
      
      var d2 = {Category: d[0].Category, State: d[0].State}
      d.forEach(function(d){
        d2[d.SubCat] = d.Value
      })
      console.log("rollup d", d, d2);
    	return d2;
    })
    .entries(data)
  	.map(function(d){ return d.value; });
  
  console.log("groupData", groupData)
  
  var stackData = stack
  	.keys(keys)(groupData)
  
  console.log("stackData", stackData)
  
  // y.domain([0, d3.max(data, function(d) { return d.Value; })]).nice();

  console.log("keys", keys)
  
  var serie = g2.selectAll(".serie")
    .data(stackData)
    .enter().append("g")
      .attr("class", "serie")
      .attr("fill", function(d) { return z(d.key); });
  
  serie.selectAll("rect")
    .data(function(d) { return d; })
    .enter().append("rect")
  		.attr("class", "serie-rect")
  		.attr("transform", function(d) { return "translate(" + x0(d.data.State) + ",0)"; })
      .attr("x", function(d) { return x1(d.data.Category); })
      .attr("y", function(d) { return y(d[1]); })
      .attr("height", function(d) { return y(d[0]) - y(d[1]); })
      .attr("width", x1.bandwidth())
  		.on("click", function(d, i){ console.log("serie-rect click d", i, d); });
  
  g2.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x0));

  g2.append("g")
      .attr("class", "axis-left")
      .call(d3.axisLeft(y).ticks(null, "s"))
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -height)
      .attr("y", y(y.ticks().pop()) - 35)
      .attr("dy", "0.32em")
      .attr("fill", "#000")
      .attr("font-weight", "bold")
      .attr("text-anchor", "start")
      .text("Amount in Dollars(thousands)");

  var legend = g2.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("text-anchor", "end")
    .selectAll("g")
    .data(keys.slice().reverse())
    .enter().append("g")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  legend.append("rect")
      .attr("x", width)
      .attr("width", 19)
      .attr("height", 19)
      .attr("fill", z);

  legend.append("text")
      .attr("x", width-10)
      .attr("y", 9.5)
      .attr("dy", "0.32em")
      .text(function(d) { return d; });
  
  // g.append("g")
  // .attr("class", "axis-bottom")
  // .attr("transform", "translate(0," + height + ")")
  // .call(d3.axisBottom(x0));
});