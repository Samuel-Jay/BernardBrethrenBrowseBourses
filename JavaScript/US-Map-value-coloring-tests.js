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
  
  getBarChartState(null, null)
  getBarChartYear(null, null)

  d3.json("Datasets/us-states.json", function(json) {
     var centered;
     var formatComma = d3.format(',');
     var fill = d3.scaleLog()
         .domain([10, 500])
         .range(["brown", "steelblue"]);
  
     var svg_choropleth = d3.select("#usamap")
         .append("svg")
         .attr("preserveAspectRatio", "xMidYMid meet")
         .attr("viewBox", "0 0 " + viewboxwidth + " " + viewboxheight + "");

    //  var tooltip = svg_choropleth.append('g');
    //  yield svg_choropleth.node();
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
             console.log(path.area(d));
             return fill(path.area(d));
         })
        //  .on("mouseover", function(d) {   
        //     const value = d.properties.name;
        //     const [x, y] = d3.mouse(this);
        //     tooltip
        //         .attr('transform', `translate(${x},${y})`)
        //         .call(callout, `${value}`);
        // })
        // .on("mouseout", function(d) {
        //     tooltip.call(callout, null)
        // });

        // function callout(svg_choropleth, value) {
        //     if (!value) return svg_choropleth.style("display", "auto");
        //     svg_choropleth
        //         .style("display", null)
        //         .style("pointer-events", "auto")
        //         .style("font", "10px sans-serif");
          
        //     const path = svg_choropleth.append("g").selectAll("path")
        //       .data([null])
        //       .append("path")
        //       .attr("fill", "white")
        //       .attr("stroke", "black");
          
        //     const text = svg_choropleth.append("g").selectAll("text")
        //       .data([null])
        //       .append("text")
        //       .call(text => text
        //         .selectAll("tspan")
        //         .data((value + "").split(/\n/))
        //         .append("tspan")
        //           .attr("x", 0)
        //           .attr("y", (d, i) => `${i * 1.1}em`)
        //           .style("font-weight", (_, i) => i ? null : "bold")
        //           .html(function(d){
        //             return d}));
            
        //     const {x, y, width: w, height: h} = text.node().getBBox(); // the box that our text is in
        //   // place the text
        //     text.attr("transform", `translate(${-w / 2},${15 - y})`);
        //     path.attr("d", `M${-w / 2 - 10},5H-5l5,-5l5,5H${w / 2 + 10}v${h + 20}h-${w + 20}z`);
        //   }

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
         getBarChartState(d.properties.name, null)
         getBarChartYear(d.properties.name, null)
     }
  });