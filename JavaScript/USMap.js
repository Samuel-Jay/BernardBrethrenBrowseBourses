import {getBarChartState} from './BarChart_StateWise.js';
import {getBarChartYear} from './BarChart_YearWise.js';

console.clear()

var margin_choropleth = {
    top: 10,
    left: 10,
    bottom: 10,
    right: 10
  },
  width_choropleth = 1000,
  width_choropleth = width_choropleth - margin_choropleth.left - margin_choropleth.right,
  mapRatio = .5,
  height_choropleth = width_choropleth * mapRatio;
  
  // D3 Projection
  var projection = d3.geoAlbersUsa()
     .scale(width_choropleth)
     .translate([width_choropleth / 2, height_choropleth / 2]);
  
  // Define path generator
  var path = d3.geoPath()
     .projection(projection);
  
  var viewboxwidth = width_choropleth * 1;
  var viewboxheight = height_choropleth - 20;
  
  getBarChartState(0)
  getBarChartYear("All States")

  d3.json("Datasets/us-states.json", function(json) {
     var centered;
     var formatComma = d3.format(',');

     var fill = d3.scaleLinear()
         .domain([0, 72])
         .range(["orange", "red"]);

     var svg_choropleth = d3.select("#usamap")
         .append("svg")
         .attr("preserveAspectRatio", "xMidYMid meet")
         .attr("viewBox", "0 0 " + viewboxwidth + " " + viewboxheight + "");
  
     var map = svg_choropleth.append("g")
         .attr("id", "states")
         .selectAll("path")
         .data(json.features)
         .enter()
         .append("path")
         .attr("d", path)
         .style("stroke", "#fff")
         .style("stroke-width", "0.1")
         .style("fill", function(d) {
            return fill(parseInt(d.id));})
        .on("click", clicked);
  
     svg_choropleth.append("g")
         .attr("class", "states-names")
         .selectAll("text")
         .data(json.features)
         .enter()
         .append("svg:text")
         .text(function(d) {
             return d.properties.name;
         })
         .attr("x", function(d) {
            if(isNaN(path.centroid(d)[0]))
                return 0;
            else
                return path.centroid(d)[0];
         })
         .attr("y", function(d) {
             if(isNaN(path.centroid(d)[1]))
                return 0;
             else
                return path.centroid(d)[1];
         })
         .attr("text-anchor", "middle")
         .attr("fill", "white")
         .on("click", clicked);
  
     function clicked(d) {
         console.log(d.properties.name)
        //  getBarChartState(2021)
         getBarChartYear(d.properties.name)
     }
  });