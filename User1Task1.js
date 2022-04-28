var margin_choropleth = {
  top: 10,
  left: 10,
  bottom: 10,
  right: 10
},
width_choropleth = 857,
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

d3.json("us-states.json", function(json) {
   var centered;
   var formatComma = d3.format(',');
   var fill = d3.scaleLog()
       .domain([10, 500])
       .range(["brown", "steelblue"]);

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
           return fill(path.area(d));
       })
       .on("click", clicked);


   function clicked(d) {

       var x, y, k;

       if (d && centered !== d) {
           var centroid = path.centroid(d);
           x = centroid[0];
           y = centroid[1];
           k = 4;
           centered = d;

       } else {
           x = viewboxwidth / 2;
           y = viewboxheight / 2;
           k = 1;
           centered = null;
       }

       map.selectAll('path')
           .classed('active', centered && function(d) {
               return d === centered;
           });

       map.transition()
           .duration(750)
           .attr('transform', 'translate(' + viewboxwidth / 2 + ',' + viewboxheight / 2 + ')scale(' + k + ')translate(' + -x + ',' + -y + ')');
        
        var xScale = d3.scaleLinear().domain([0, 100]).range([0, width]);
        var yScale = d3.scaleLinear().domain([0, 200]).range([height, 0]);
        
        // Title
        svg_choropleth.append('text')
        .attr('x', viewboxwidth/2 + 100)
        .attr('y', viewboxheight/8)
        .attr('text-anchor', 'middle')
        .style('font-family', 'Helvetica')
        .style('font-size', 10)
        .text('Line Chart');
        
        // X label
        svg_choropleth.append('text')
        .attr('x', viewboxwidth/2 + 100)
        .attr('y', viewboxheight - 15 + 150)
        .attr('text-anchor', 'middle')
        .style('font-family', 'Helvetica')
        .style('font-size', 10)
        .text('Independant');
        
        // Y label
        svg_choropleth.append('text')
        .attr('text-anchor', 'middle')
        .attr('transform', 'translate(60,' + height + ')rotate(-90)')
        .style('font-family', 'Helvetica')
        .style('font-size', 10)
        .text('Dependant');

        g.append("g")
         .attr("transform", "translate(0," + height + ")")
         .call(d3.axisBottom(xScale));
        
        g.append("g")
         .call(d3.axisLeft(yScale));

        svg_choropleth.append('g')
        .selectAll("dot")
        .data("FakeUser1Task1dataset.csv")
        .enter()
        .append("circle")
        .attr("cx", function (d) { return xScale(d[1]); } )
        .attr("cy", function (d) { return yScale(d[2]); } )
        .attr("r", 3)
        .attr("transform", "translate(" + 100 + "," + 100 + ")")
        .style("fill", "#CC0000");

        var line = d3.line()
        .x(function(d) { return xScale(d[0]); }) 
        .y(function(d) { return yScale(d[1]); }) 
        .curve(d3.curveMonotoneX)
        
        svg_choropleth.append("path")
        .datum("FakeUser1Task1dataset.csv") 
        .attr("class", "line") 
        .attr("transform", "translate(" + 100 + "," + 100 + ")")
        .attr("d", line)
        .style("fill", "none")
        .style("stroke", "#CC0000")
        .style("stroke-width", "2");
   }
});