var width=410,
	height=440,
	radius=100,
	padding=20;
var margin = {top: 20, right: 20, bottom: 30, left: 50};

// var yearly_people_count = {}
// yearly_people_count["2012"] = 2013.98
// yearly_people_count["2013"] = 2026.34
// yearly_people_count["2014"] = 601.41
// yearly_people_count["2015"] = 1990.24
// yearly_people_count["2016"] = 1854.87
// yearly_people_count["2017"] = 1859.14
// yearly_people_count["2018"] = 1800.84
// yearly_people_count["2019"] = 1801.01
// yearly_people_count["2020"] = 1579.59
// yearly_people_count["2021"] = 1635.43

var state_collect = []

export function getHousingPrices(state_select){
  console.log("Inside getHousingPrices")

  if(state_select!="All States" && !state_collect.includes(state_select)){
  	state_collect.push(state_select)
  }

  d3.select("#HousingPrices").select("svg").selectAll("*").remove();
  var svg4=d3.select("#HousingPrices").select("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    var g4 = svg4.append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  d3.csv("Datasets/asec_groupedvalues.csv", function(error, data) {

		// data.forEach(function(d){
		//   d.PROPERTY_VAL = d.PROPERTY_VAL / yearly_people_count[d.YEAR];
		// })
	
		update(state_select, data);

		function update(state_select, data) {
				  

		  // var data = data.filter(function(d) {
		  //   if(state_select!="All States"){
		  //    return d.STATE == state_select; 
		  //   }
		  //   else{return true}
		  // });



		  var dataGroup = d3.nest()
		  .key(function(d) {return d.STATE;})
		  .key(function(d) {return d.YEAR;})
		  .rollup (function(v) { return {
		     PROPERTY_VAL: d3.sum(v, function(d) {return d.PROPERTY_VAL; })
		   }; })
		  .entries(data);

		  var legend_size = 0
		  var xScale = d3.scaleLinear()
		    .domain(d3.extent(data, function(d) { return d.YEAR; }))
		    .range([ 0, width - legend_size]);

		  // Add Y axis
		  var yScale = d3.scaleLinear()
		    .domain([d3.min(data, function(d) { return +d.PROPERTY_VAL; }), d3.max(data, function(d) { return +d.PROPERTY_VAL; })])
		    // .domain([0, d3.max(data, function(d) { 
		    //   if(state_select == "All States"){
		    //     return 12 * d.PROPERTY_VAL
		    //   }
		    //   else{
		    //     return 2.5
		    //   }
		    // })])
		    .range([ height, 0 ])	  


		  var lineGen = d3.line()
		    .x(function(d) {
		        return xScale(d.YEAR);
		    })
		    .y(function(d) {
		        return yScale(d.PROPERTY_VAL);
		    })


		  var res = ["Maine", "New Hampshire", "Vermont", "Massachusetts", "Rhode Island", "Connecticut", "New York", "New Jersey", "Pennsylvania", "Ohio", "Indiana", "Illinois", "Michigan", "Wisconsin", "Minnesota", "Iowa", "Missouri", "North Dakota", "South Dakota", "Nebraska", "Kansas", "Delaware", "Maryland", "District of Columbia", "Virginia", "West Virginia", "North Carolina", "South Carolina", "Georgia", "Florida", "Kentucky", "Tennessee", "Alabama", "Mississippi", "Arkansas", "Louisiana", "Oklahoma", "Texas", "Montana", "Idaho", "Wyoming", "Colorado", "New Mexico", "Arizona", "Utah", "Nevada", "Washington", "Oregon", "California", "Alaska", "Hawaii"]
		  var color = d3.scaleOrdinal()
		    .domain(res)
		    .range(["#6c6bf6",
				"#9bbe00",
				"#d26af2",
				"#67df60",
				"#d628a9",
				"#009e2c",
				"#7c2d9b",
				"#20e194",
				"#ad007f",
				"#308700",
				"#0183fe",
				"#82a200",
				"#0154c0",
				"#b79700",
				"#0092f6",
				"#d76f00",
				"#b690ff",
				"#019748",
				"#ff58b3",
				"#007c3d",
				"#e63035",
				"#00d3ef",
				"#d04006",
				"#69d4f5",
				"#a02000",
				"#01b9b5",
				"#a70055",
				"#02af86",
				"#912572",
				"#b6d161",
				"#4f4993",
				"#8b8200",
				"#dfa4ff",
				"#b87900",
				"#83b0ff",
				"#fcba60",
				"#d7b6ff",
				"#50570f",
				"#ff92d4",
				"#006944",
				"#ff7b56",
				"#69d9c2",
				"#922e4b",
				"#9ed39c",
				"#ff8290",
				"#00877d",
				"#ffa9b6",
				"#6d8c5b",
				"#823f37",
				"#d7c779",
				"#82401e",
				"#7f5400"])


		  g4.selectAll(".line")
		    .data(dataGroup)
		    .enter()
		    .append("path")
		      .attr("fill", "none")
		      // .attr("stroke", function(d){ return "#ffffff" })
		      .attr("stroke-width", function(d){
		        if(state_select == "All States"){ return 4 }
		        else if(state_collect.includes(d.key)){ return 5 }
		        else{ return 3 }
		      })
		      .attr("stroke-opacity", function(d){
		        if(state_select == "All States"){ return 0.5 }
		        else if(state_collect.includes(d.key)){ return 0.8 }
		        else{ return 0.25 }
		      })
		      .attr("stroke", function(d){
		        if(state_select == "All States"){ return "#ffffff" }
		        else if(state_collect.includes(d.key)){ return color(d.key) }
		        else{ return "#ffffff" }
		      })
		      // .attr("stroke-width", 3)
		      // .attr("stroke-opacity", 0.5)
		      .attr("d", function(d){
		        return d3.line()
		          .x(function(d) { return xScale(d.key); })
		          .y(function(d) { return yScale(+d.value.PROPERTY_VAL); })
		          (d.values)
		      })
		      .on("click", function(d){getHousingPrices(d.key)})


		  g4.append("g")
		    .attr("transform", "translate(0," + height + ")")
        .attr("class", "axisWhite")
		    .call(d3.axisBottom(xScale).ticks(10).tickFormat(d3.format("Y")));

		  g4.append("g")
        .attr("class", "axisWhite")
		    .call(d3.axisLeft(yScale)
		      .ticks(5)
		      .tickSizeInner(0)
		      .tickPadding(6)
		      .tickSize(0, 0)
		      .tickFormat(d => "$"+d)
		    )

		  // Add one dot in the legend for each name.
		  var size = 8

		  g4.selectAll("mydots")
		    .data(state_collect)
		    .enter()
		    .append("rect")
		      .attr("x", width - 200)
		      .attr("y", function(d,i){ return 20 + i*(size+5)}) // 100 is where the first dot appears. 25 is the distance between dots
		      .attr("width", size)
		      .attr("height", size)
		      .style("fill", function(d){ return color(d)})


		  // Add one dot in the legend for each name.
		  g4.selectAll("mylabels")
		    .data(state_collect)
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
		        getHousingPrices(state_select)
		      });

		  g4.append("text")
		    .attr("x", (width / 2))             
		    .attr("y", 0)
		    .attr("text-anchor", "middle")  
		    .style("fill", "#ffffff")
		    .style("font-size", "16px") 
		    .style("text-decoration", "underline")  
		    .text("Housing Prices");

		  g4.append("text")
		    .attr("x", width - 50)             
		    .attr("y", 20)
		    .attr("text-anchor", "middle")   
		    .style("fill", "#ffffff")
		    .style("font-size", "12px") 
		    .style("text-decoration", "underline")  
		    .text("Click to Refresh")
		    .on('click', function(d,i) {
		        state_collect = []
		        getHousingPrices("All States")
		    })
		  
		}

	});
}