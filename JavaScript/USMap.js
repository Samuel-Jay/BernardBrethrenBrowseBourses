import {getBarChartState} from './BarChart_StateWise.js'
import {getBarChartYear} from './BarChart_YearWise.js'
import {getEducationLevels} from './EducationLevels.js'
import {getHousingPrices} from './HousingPrices.js'
import {getPovertyRates} from './PovertyRates.js'

console.clear()

var state_names = ["Maine", "New Hampshire", "Vermont", "Massachusetts", "Rhode Island", "Connecticut", "New York", "New Jersey", "Pennsylvania", "Ohio", "Indiana", "Illinois", "Michigan", "Wisconsin", "Minnesota", "Iowa", "Missouri", "North Dakota", "South Dakota", "Nebraska", "Kansas", "Delaware", "Maryland", "District of Columbia", "Virginia", "West Virginia", "North Carolina", "South Carolina", "Georgia", "Florida", "Kentucky", "Tennessee", "Alabama", "Mississippi", "Arkansas", "Louisiana", "Oklahoma", "Texas", "Montana", "Idaho", "Wyoming", "Colorado", "New Mexico", "Arizona", "Utah", "Nevada", "Washington", "Oregon", "California", "Alaska", "Hawaii"]

var margin_choropleth = {
    top: 10,
    left: 10,
    bottom: 10,
    right: 10
  },
  width_choropleth = 1000,
  width_choropleth = width_choropleth - margin_choropleth.left - margin_choropleth.right,
  mapRatio = .5,
  height_choropleth = width_choropleth * mapRatio
  
  // D3 Projection
var projection = d3.geoAlbersUsa()
   .scale(width_choropleth)
   .translate([width_choropleth / 2, height_choropleth / 2])

// Define path generator
var path = d3.geoPath()
   .projection(projection)

var viewboxwidth = width_choropleth * 1
var viewboxheight = height_choropleth - 20

getBarChartState(0)
getBarChartYear("All States")
getEducationLevels("All States")
getHousingPrices("All States")
getPovertyRates("All States")

var poverty_data

function getPovertyColor(state){
  var poverty_level
  var state_color = ""
  for (var row in poverty_data) {
    if(poverty_data[row].key==state){
      poverty_level = poverty_data[row].value.POVERTY_LEVEL
    }
  }
  
  // var colorFn = d3.scaleSequential()
  //   .interpolator(d3.interpolateRgb("green", "red"))
  //   .domain([1.2, 1.7])
  // var colorFn = d3.scaleLinear()
  //        .domain([1.2, 1.7])
  //        .range("green", "red")
  // var colorFn = d3.scaleSequential(d3.interpolateReds)
    var colorFn = d3.scaleSequential(d3.interpolate("yellow", "red"))
    .domain([1.28, 1.57])

  var state_color = colorFn(poverty_level)

  state_color = d3.color(state_color)

  state_color = "#" + ((1 << 24) + (state_color.r << 16) + (state_color.g << 8) + state_color.b).toString(16).slice(1)
    
  return state_color
}
  
getMap(0)  

export function getMap(year){
  d3.csv("Datasets/asec_groupedvalues.csv", function(error, data) {
    if (error) throw error;
    var dataGroup = d3.nest()
      .key(function(d) {return d.STATE})
      // .key(function(d) {return d.YEAR})
      .rollup(function(v) { return {
         POVERTY_LEVEL: d3.mean(v, function(d) {return d.POVERTY_LEVEL })
       } })
      .entries(data)

      poverty_data = dataGroup
    

  })


  d3.json("Datasets/us-states.json", function(json) {
     var centered
     var formatComma = d3.format(',')

     var fill = d3.scaleLinear()
         .domain([0, 72])
         .range(["orange", "red"])

     var svg_choropleth = d3.select("#usamap")
         .append("svg")
         .attr("preserveAspectRatio", "xMidYMid meet")
         .attr("viewBox", "0 0 " + viewboxwidth + " " + viewboxheight + "")



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
            // return fill(parseInt(d.id))})
            return getPovertyColor(d.properties.name)})
        .on("click", clicked)

     svg_choropleth.append("g")
         .attr("class", "states-names")
         .selectAll("text")
         .data(json.features)
         .enter()
         .append("svg:text")
         .text(function(d) {
             return d.properties.name
         })
         .style("font-size", "12px") 
         .attr("x", function(d) {
            if(isNaN(path.centroid(d)[0]))
                return 0
            else
                return path.centroid(d)[0]
         })
         .attr("y", function(d) {
             if(isNaN(path.centroid(d)[1]))
                return 0
             else
                return path.centroid(d)[1]
         })
         .attr("text-anchor", "middle")
         .attr("fill", "white")
         .on("click", clicked)

     function clicked(d) {
         console.log(d.properties.name)
        //  getBarChartState(2021)
        getBarChartYear(d.properties.name)
        getEducationLevels(d.properties.name)
        getHousingPrices(d.properties.name)
        getPovertyRates(d.properties.name)
     }
  })
}