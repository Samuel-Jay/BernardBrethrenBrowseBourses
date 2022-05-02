var width=290+290,
	height=200,
	radius=100,
	padding=20;
var margin = {top: 20, right: 20, bottom: 30, left: 50};

var yearly_people_count = {}
yearly_people_count["2012"] = 2013.98
yearly_people_count["2013"] = 2026.34
yearly_people_count["2014"] = 601.41
yearly_people_count["2015"] = 1990.24
yearly_people_count["2016"] = 1854.87
yearly_people_count["2017"] = 1859.14
yearly_people_count["2018"] = 1800.84
yearly_people_count["2019"] = 1801.01
yearly_people_count["2020"] = 1579.59
yearly_people_count["2021"] = 1635.43

var edu_select = "No Highlight"

// getEducationLevels(null, null)
// var svg3 = d3.select("#EducationLevels")
// 	.append("svg")
// 	  .attr("width", width + margin.left + margin.right)
// 	  .attr("height", height + margin.top + margin.bottom)
	
// var g3 = svg3.append("g")
//       .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

export function getEducationLevels(state_select){
  console.log("Inside getEducationLevels")
  // svg3.remove();
  d3.select("#EducationLevels").select("svg").selectAll("*").remove();
  var svg3=d3.select("#EducationLevels").select("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    var g3 = svg3.append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  d3.csv("Datasets/asec_groupededulevels.csv", function(error, data) {
		// d3.csv("company.csv", function(error, data) {
		// if (error) throw error;

		data.forEach(function(d){
		  d.EDU_LEVEL_COUNT = d.EDU_LEVEL_COUNT / yearly_people_count[d.YEAR];
		})
		// nest our data
		// state_select = d3.select('#selectbox').property('value')
		// var state_select = "Alabama"
		update(state_select, data);

		function update(state_select, data) {
				  

		  var data = data.filter(function(d) {
		    if(state_select!="All States"){
		     return d.STATE == state_select; 
		    }
		    else{return true}
		  });



		  var dataGroup = d3.nest()
		  .key(function(d) {return d.EDU_LEVEL;})
		  .key(function(d) {return d.YEAR;})
		  .rollup (function(v) { return {
		     EDU_LEVEL_COUNT: d3.sum(v, function(d) {return d.EDU_LEVEL_COUNT; })
		   }; })
		  .entries(data);

		  var xScale = d3.scaleLinear()
		    .domain(d3.extent(data, function(d) { return d.YEAR; }))
		    .range([ 0, width ]);

		  // Add Y axis
		  var yScale = d3.scaleLinear()
		    // .domain([0, d3.max(data, function(d) { return +d.EDU_LEVEL_COUNT; })])
		    .domain([0, d3.max(data, function(d) { 
		      if(state_select == "All States"){
		        return 12 * d.EDU_LEVEL_COUNT
		      }
		      else{
		        // return d.EDU_LEVEL_COUNT
		        return 2.5
		      }
		    })])
		    // .domain([0, 25])
		    .range([ height, 0 ])


		  g3.append("g")
		    .attr("transform", "translate(0," + height + ")")
        .attr("class", "axisWhite")
		    .call(d3.axisBottom(xScale).ticks(10).tickFormat(d3.format("Y")));

		  g3.append("g")
        .attr("class", "axisWhite")
		    .call(d3.axisLeft(yScale)
		      .ticks(5)
		      .tickSizeInner(0)
		      .tickPadding(6)
		      .tickSize(0, 0)
		      .tickFormat(d => d + "%")
		    )

		  



		  var lineGen = d3.line()
		    .x(function(d) {
		        return xScale(d.YEAR);
		    })
		    .y(function(d) {
		        return yScale(d.EDU_LEVEL_COUNT);
		    })




		  var res = ["Pre-School", "Kindergarten", "Elementary", "Middle School", "High School", "High school graduate", "Some college but no degree", "Bachelor's degree", "Associate degree in college", "Professional school degree", "Master's degree", "Doctorate degree"]
		  var color = d3.scaleOrdinal()
		    .domain(res)
		    .range(["#ec6891",
		      "#2c7bff",
		      "#53b21d",
		      "#ff00be",
		      "#006300",
		      "#c94200",
		      "#4e479c",
		      "#ff951f",
		      "#e3cf00",
		      "#8e44c8",
		      "#f10011",
		      "#00cdaa"])


		  g3.selectAll(".line")
		    .data(dataGroup)
		    .enter()
		    .append("path")
		      .attr("fill", "none")
		      .attr("stroke", function(d){ return color(d.key) })
		      .attr("stroke-width", function(d){
		        if(edu_select == "No Highlight"){ return 1.5 }
		        else if(d.key == edu_select){ return 2.5 }
		        else{ return 0.5 }
		      })
		      .attr("stroke-opacity", function(d){
		        if(edu_select == "No Highlight"){ return 0.5 }
		        else if(d.key == edu_select){ return 1.0 }
		        else{ return 0.25 }
		      })
		      .attr("d", function(d){
		        return d3.line()
		          .x(function(d) { return xScale(d.key); })
		          .y(function(d) { return yScale(+d.value.EDU_LEVEL_COUNT); })
		          (d.values)
		      })

		  // Add one dot in the legend for each name.
		  var size = 10
		  g3.selectAll("mydots")
		    .data(res)
		    .enter()
		    .append("rect")
		      .attr("x", width - 200)
		      .attr("y", function(d,i){ return 20 + i*(size+5)}) // 100 is where the first dot appears. 25 is the distance between dots
		      .attr("width", size)
		      .attr("height", size)
		      .style("fill", function(d){ return color(d)})


		  // Add one dot in the legend for each name.
		  g3.selectAll("mylabels")
		    .data(res)
		    .enter()
		    .append("text")
		      .attr("x", width - 200 + size*1.2)
		      .attr("y", function(d,i){ return 20 + (i+0.5)*(size+5) }) // 100 is where the first dot appears. 25 is the distance between dots
		      .style("fill", function(d){ return color(d)})
		      .text(function(d){ return d})
		      .attr("text-anchor", "left")
		      .style("alignment-baseline", "middle")
		      .on('click', function(d,i) {
		        console.log(d)
		        edu_select = d;
		        getEducationLevels(state_select)
		      });

		  g3.append("text")
		    .attr("x", (width / 2))             
		    // .attr("y", 0 - (margin.top / 2))
		    .attr("y", 0)
		    .attr("text-anchor", "middle")  
		    .style("fill", "#ffffff")
		    .style("font-size", "16px") 
		    .style("text-decoration", "underline")  
		    .text("Education Levels for "+state_select);

		  g3.append("text")
		    .attr("x", width)             
		    // .attr("y", 0 - (margin.top / 2))
		    .attr("y", 0)
		    .attr("text-anchor", "middle")  
		    .style("font-size", "12px") 
		    .style("text-decoration", "underline")  
		    .text("Click to Refresh")
		    .on('click', function(d,i) {
		        // console.log("Hello There")
		        edu_select = "No Highlight"
		        // update(state_select, data);
		        getEducationLevels(state_select)
		    })
		  
		}

		// var selectbox = d3.select("#selectbox")
		//   .on("change", function() {
		//     update(this.value, data)
		// })




	});
}