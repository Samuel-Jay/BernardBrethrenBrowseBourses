var width = 500;
var height = 400;

var svg = d3.select("svg"),
            margin = 200,
            width = svg.attr("width") - margin,
            height = svg.attr("height") - margin

var xScale = d3.scaleLinear().domain([0, 100]).range([0, width]),
yScale = d3.scaleLinear().domain([0, 200]).range([height, 0]);

// Title
svg.append('text')
.attr('x', width/2 + 100)
.attr('y', 100)
.attr('text-anchor', 'middle')
.style('font-family', 'Helvetica')
.style('font-size', 20)
.text('Line Chart');

// X label
svg.append('text')
.attr('x', width/2 + 100)
.attr('y', height - 15 + 150)
.attr('text-anchor', 'middle')
.style('font-family', 'Helvetica')
.style('font-size', 12)
.text('Year');

// Y label
svg.append('text')
.attr('text-anchor', 'middle')
.attr('transform', 'translate(60,' + height + ')rotate(-90)')
.style('font-family', 'Helvetica')
.style('font-size', 12)
.text('Housing Price');

svg.append("g")
.attr("transform", "translate(0," + height + ")")
.call(d3.axisBottom(xScale));

svg.append("g")
.call(d3.axisLeft(yScale));

d3.csv("Datasets/BarChartStateWiseDataset.csv", function(data) {

    var table = d3.nest()
    .key(function(d) {return d.State;})
    .key(function(d) {return d.Year;})
    .rollup(function(d) {
        var value = 0;
        if (d.Category == "Income") {value += d.Value;}
        else if (d.Category == "Expenditure" || d.Category == "HP") {value -= d.Value;}
        NET_EARNINGS: value
    })
    .entries(data);

    svg.append('g')
    .selectAll("dot")
    .data(table)
    .enter()
    .append("circle")
    .attr("cx", function (d) { return xScale(d.key(Year)); } )
    .attr("cy", function (d) { return yScale(d.key(Year)[NET_EARNINGS]); } )
    .attr("r", 2)
    .attr("transform", "translate(" + 100 + "," + 100 + ")")
    .style("fill", "#CC0000");

    var line = d3.line()
            .x(function(d) { return xScale(d.values[4]); }) 
            .y(function(d) { return yScale(d.values[3]); }) 
            .curve(d3.curveMonotoneX)
            
    svg.append("path")
    .datum(table) 
    .attr("class", "line") 
    .attr("transform", "translate(" + 100 + "," + 100 + ")")
    .attr("d", line)
    .style("fill", "none")
    .style("stroke", "#CC0000")
    .style("stroke-width", "2");
});