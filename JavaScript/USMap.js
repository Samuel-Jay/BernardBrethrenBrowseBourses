import {getBarChartState} from './BarChart_StateWise.js'
import {getBarChartYear} from './BarChart_YearWise.js'
import {getEducationLevels} from './EducationLevels.js'
import {getHousingPrices} from './HousingPrices.js'
import {getPovertyRates} from './PovertyRates.js'

var width=700,
  height=480,
  radius=100,
  padding=20;
var margin = {top: 20, right: 20, bottom: 30, left: 50};

console.clear()

var state_names = ["Maine", "New Hampshire", "Vermont", "Massachusetts", "Rhode Island", "Connecticut", "New York", "New Jersey", "Pennsylvania", "Ohio", "Indiana", "Illinois", "Michigan", "Wisconsin", "Minnesota", "Iowa", "Missouri", "North Dakota", "South Dakota", "Nebraska", "Kansas", "Delaware", "Maryland", "District of Columbia", "Virginia", "West Virginia", "North Carolina", "South Carolina", "Georgia", "Florida", "Kentucky", "Tennessee", "Alabama", "Mississippi", "Arkansas", "Louisiana", "Oklahoma", "Texas", "Montana", "Idaho", "Wyoming", "Colorado", "New Mexico", "Arizona", "Utah", "Nevada", "Washington", "Oregon", "California", "Alaska", "Hawaii"]


var dropDownValues = ['All years', 2021,2020,2019,2018,2017, 2016, 2015, 2014, 2013, 2012]
d3.select("#selectButton")
      .selectAll('myOptions')
        .data(dropDownValues)
      .enter()
        .append('option')
      .text(function (d) { return d; }) // text showed in the menu
      .attr("value", function (d) { return d; }) // corresponding value returned by the button

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

getBarChartState("All States", 0, "Housing")
getBarChartYear("All States", 0, "Housing")
getEducationLevels("All States", 0, "Housing")
getHousingPrices("All States", 0, "Housing")
getPovertyRates("All States", 0, "Housing")

var svg_choropleth = d3.select("#usamap")
  .append("svg")
  .attr("preserveAspectRatio", "xMidYMid meet")
  .attr("viewBox", "0 0 " + viewboxwidth + " " + viewboxheight + "")

var poverty_data
var poverty_min = 1.28
var poverty_max = 1.57

var povertyScale = d3.scaleSequential(d3.interpolate("red", "yellow"))
    .domain([poverty_min, poverty_max])

var housing_data
var housing_min = 100000
var housing_max = 800000

var housingScale = d3.scaleSequential(d3.interpolate("yellow", "green"))
    .domain([housing_min, housing_max])


var migration_data

function getPovertyColor(state){
  var poverty_level
  var state_color = ""
  for (var row in poverty_data) {
    if(poverty_data[row].key==state){
      poverty_level = poverty_data[row].value.POVERTY_LEVEL
    }
  }
  var state_color = povertyScale(poverty_level)
  state_color = d3.color(state_color)
  state_color = "#" + ((1 << 24) + (state_color.r << 16) + (state_color.g << 8) + state_color.b).toString(16).slice(1)
    
  return state_color
}

function getHousingColor(state){
  var housing_value
  var state_color = ""
  for (var row in housing_data) {
    if(housing_data[row].key==state){
      housing_value = housing_data[row].value.PROPERTY_VAL
    }
  }
  var state_color = housingScale(housing_value)
  state_color = d3.color(state_color)
  state_color = "#" + ((1 << 24) + (state_color.r << 16) + (state_color.g << 8) + state_color.b).toString(16).slice(1)
    
  return state_color
}

function getMigrationReason(state){
  var migr_reas
  var state_color = ""
  for (var row in migration_data) {
    if(migration_data[row].key==state){
      migr_reas = migration_data[row].value.MIGRATION_REASON
    }
  }
  
    
  return migr_reas
}
  
getMap("All States", 0, "Housing")  

export function getMap(state, year, map_view){
  var year_text = "All Years"
  if(year!= 0 ){
    year_text = year
  }
  d3.select("#usamap").select("svg").selectAll("*").remove();

  d3.csv("Datasets/asec_groupedvalues.csv", function(error, data) {
    if (error) throw error;

    var data = data.filter(function(d) {
        if(year!=0){
         return d.YEAR == year; 
        }
        else{return true}
      });
    var dataGroup

    if(map_view=="Poverty"){
      dataGroup = d3.nest()
      .key(function(d) {return d.STATE})
      // .key(function(d) {return d.YEAR})
      .rollup(function(v) { return {
         POVERTY_LEVEL: d3.mean(v, function(d) {return d.POVERTY_LEVEL })
       } })
      .entries(data)

      poverty_data = dataGroup
    }
    else{
      dataGroup = d3.nest()
      .key(function(d) {return d.STATE})
      // .key(function(d) {return d.YEAR})
      .rollup(function(v) { return {
         PROPERTY_VAL: d3.mean(v, function(d) {return d.PROPERTY_VAL })
       } })
      .entries(data)

      housing_data = dataGroup
    }

    // if(state!="All States"){
    //   dataGroup = d3.nest()
    //   .key(function(d) {return d.STATE})
    //   // .key(function(d) {return d.YEAR})
    //   .rollup(function(v) { return {
    //      MIGRATION_REASON: d3.mode(v, function(d) {return d.MIGRATION_REASON })
    //    } })
    //   .entries(data)

    //   migration_data = dataGroup

    // }

  })


  d3.json("Datasets/us-states.json", function(json) {

    var centered
    var formatComma = d3.format(',')

    var fill = d3.scaleLinear()
        .domain([0, 72])
        .range(["orange", "red"])

     d3.select("#usamap").select("svg").selectAll("*").remove();
     var svg_choropleth = d3.select("#usamap")
         .select("svg")
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
            if(map_view == "Poverty"){
              return getPovertyColor(d.properties.name)
            }
            else{
              return getHousingColor(d.properties.name)
            }
            
          })
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

      
      svg_choropleth.append("g").append("text")
        .attr("x", (width / 2))             
        .attr("y", 20)
        .attr("text-anchor", "middle")  
        .style("fill", "#ffffff")
        .style("font-size", "24px") 
        .style("text-decoration", "underline")  
        .text(map_view+" Map View for "+year_text);

      // if(state!="All States"){
      //   svg_choropleth.append("g").append("text")
      //   .attr("x", (width - 100))             
      //   .attr("y", (height - 50))
      //   .attr("text-anchor", "right")  
      //   .style("fill", "#ffffff")
      //   .style("font-size", "16px") 
      //   // .style("text-decoration", "underline")  
      //   .text("Most common reason for leaving "+state+" for "+year_text+" "+getMigrationReason(state));
      // }
      

     function clicked(d) {
        console.log(d.properties.name, year, map_view)
        getBarChartState(d.properties.name, year, map_view)
        getBarChartYear(d.properties.name, year, map_view)
        getEducationLevels(d.properties.name, year, map_view)
        getHousingPrices(d.properties.name, year, map_view)
        getPovertyRates(d.properties.name, year, map_view)
        getMap(d.properties.name, year, map_view)
     }
     // When the button is changed, run the updateChart function
    d3.select("#selectButton").on("change", function(d) {
      // recover the option that has been chosen
      var selectedOption = d3.select(this).property("value")
      // run the updateChart function with this selected option
      if(selectedOption == 'All years'){
        getMap(state, 0, map_view)
        getBarChartState(state, 0, map_view)
      }
      else{
        getMap(state, selectedOption, map_view)
        getBarChartState(state, selectedOption, map_view)
      }
      })
  })
}
