import {getMap} from './USMap.js'
import {getBarChartState} from './BarChart_StateWise.js'

var width=700,
  height=260,
  radius=100,
  padding=20;
var margin = {top: 20, right: 20, bottom: 30, left: 50};

// getBarChartYear("All States")

export function getBarChartYear(state, year, map_view){
  var year_text = "All Years"
  if(year!= 0 ){
    year_text = year
  }


  var width=700,
    height=260,
    radius=100,
    padding=20;
  var margin = {top: 20, right: 20, bottom: 30, left: 50};

  console.log("Inside getBarChartYear")
  console.log("State selected is ", state)

  d3.select("#BarChartYear").select("svg").selectAll("*").remove();
  var svg2=d3.select("#BarChartYear").select("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    var g2 = svg2.append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var x0 = d3.scaleBand()
      .rangeRound([0, width])
      .paddingInner(0.1);

  var x1 = d3.scaleBand()
      .padding(0.05);

  var y = d3.scaleLinear()
      .domain([0,60])
      .range([height, 0])
      ;

  var y1 = d3.scaleBand()
    
  var z = d3.scaleOrdinal()
      .range(["#ca0020","#92c5de","#f4a582","#d5d5d5","#92c5de","#0571b0"]);

  var stack = d3.stack()
      // .offset(d3.stackOffsetExpand);
  

  d3.csv("Datasets/BarChartYearWiseDataset.csv", function(error, data) {
    if (error) throw error;
    
    data.forEach(function(d){
      d.Value = +d.Value/1000;
    })
    
    // console.log("data", data);
    
    var data = data.filter(function(d){
        return d.State == state;
    })
    console.log("data after filtering", data);

    var data = data.filter(function(d){
      return d.Category != 'HP';
    })
    console.log("data after HP filtering", data);

    x0.domain(data.map(function(d) { return d.Year; })); // x_axis
    x1.domain(data.map(function(d) { return d.Category; })) 
      .rangeRound([0, x0.bandwidth()])
      .padding(0.2);
    
    z.domain(data.map(function(d) { return d.SubCat; })) // labelling for diff parts of stacked bars
    var keys = z.domain()
    // console.log("keys", keys);
    var groupData = d3.nest()
      .key(function(d) { return d.Category + d.Year; })
      .rollup(function(d, i){
        
        var d2 = {Category: d[0].Category, Year: d[0].Year}
        d.forEach(function(d){
          d2[d.SubCat] = d.Value
        })
        // console.log("rollup d", d, d2);
        return d2;
      })
      .entries(data)
      .map(function(d){ return d.value; });
    
    // console.log("groupData", groupData)
    
    var stackData = stack
      .keys(keys)(groupData)
    
    // console.log("stackData", stackData)
    
    // y.domain([0, d3.max(data, function(d) { return d.Value; })]).nice();

    // console.log("keys", keys)
    
    var serie = g2.selectAll(".serie")
      .data(stackData)
      .enter().append("g")
        .attr("class", "serie")
        .attr("fill", function(d) { return z(d.key); });
    
    serie.selectAll("rect")
      .data(function(d) { return d; })
      .enter().append("rect")
        .attr("class", "serie-rect")
        .attr("transform", function(d) { return "translate(" + x0(d.data.Year) + ",0)"; })
        .attr("x", function(d) { return x1(d.data.Category); })
        .attr("y", function(d) { return y(d[1]); })
        .attr("height", function(d) { return y(d[0]) - y(d[1]); })
        .attr("width", x1.bandwidth())
        .on("click", function(d){ 
          getBarChartState(state, d.data.Year, map_view) 
          getMap(state, d.data.Year, map_view)
        });
    
    g2.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + height + ")")
        .attr("class", "axisWhite")
        .call(d3.axisBottom(x0));

    g2.append("g")
        .attr("class", "axis-left")
        .attr("class", "axisWhite")
        .call(d3.axisLeft(y).ticks(null, "s"))
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -height+30)
        .attr("y", -1.5*padding)
        .attr("dy", "0.32em")
        .attr("class", "axisWhite")
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
        .attr('fill', '#ffffff')
        .text(function(d) { return d; });

    g2.append("text")
        .attr("x", (width / 2))             
        .attr("y", 0)
        .attr("text-anchor", "middle")  
        .style("fill", "#ffffff")
        .style("font-size", "24px") 
        .style("text-decoration", "underline")  
        .text("Income-Expenditure for "+state);
  });
}
