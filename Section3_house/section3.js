
//import mapboxgl from 'mapbox-gl';
//import * as mapboxgl from "./node_modules/mapbox-gl/dist/mapbox-gl.js"
//const mapboxgl = require('mapbox-gl');

mapboxgl.accessToken = 'pk.eyJ1IjoieXVoYW9saXUiLCJhIjoiY2treTRvNjBoMm4zbTJvcW5idW5vNThraCJ9.__fJXzNMCa1rTeyWJjq63A';
const map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/yuhaoliu/ckm64ii1bep4a17l9rm7b4bdi', // style location
    center: [-0.1, 51.5], // starting position [lng, lat]
    zoom: 9.5 // starting zoom
});


// Create an array of the available data years
var years = [
    '2011',
    '2012',
    '2013',
    '2014',
    '2015',
    '2016',
    '2017',
];



map.on('load', function () {


    map.addControl(new mapboxgl.NavigationControl(), "top-right");


    // This is the main function that runs when the user changes the data year
    function setYear(year) {

        document.getElementById('year').textContent = 'Year: ' + years[year];  // Set the label to the correct year

        var p = map.getPaintProperty('londonhp', 'fill-color');

        console.log(p);
        p[1][1] = "Value" + years[year];
        console.log(p);
        map.setPaintProperty('londonhp', 'fill-color', p);

    }


    // Add the proportional circle layer to the map
    map.addLayer({
        id: 'londonhp',
        type: 'fill',
        source: {
            type: 'vector',
            url: 'mapbox://yuhaoliu.7pe1v77n' // Your Mapbox tileset Map ID
        },
        'source-layer': 'output-8i7otw', // name of tilesets
        'layout': {
            'visibility': 'visible',

        },
        paint: {
            "fill-opacity": 0.65,
            "fill-outline-color": "hsl(29,6%,95%)",
            "fill-color": [
                "step",
                ["get", "Value2011"],
                "hsl(214, 78%, 60%)",
                200000,
                "hsl(192, 70%, 71%)",
                400000,
                "hsl(153, 69%, 70%)",
                800000,
                "hsl(57, 68%, 72%)",
                1600000,
                "hsl(28, 83%, 61%)",
                3200000,
                "hsl(0, 78%, 56%)"
            ]
        }

    }, 'admin-1-boundary-bg');

    map.addLayer({
        id: 'highlight',
        type: 'line',
        source: {
            type: 'vector',
            url: 'mapbox://yuhaoliu.7pe1v77n' // Your Mapbox tileset Map ID
        },
        'source-layer': 'output-8i7otw', // name of tilesets
        'layout': {
            'visibility': 'visible',

        },
        paint: {
            'line-color': '#faa',
            'line-width': 2
        },
        filter: ['==', 'Code', 'null']
    }, 'admin-1-boundary-bg');


    //Assign an event listner to the slider so that the setYear function runs when the user changes the slider
    document.getElementById('slider').addEventListener('input', function (e) {
        console.log(e);

        var year = parseInt(e.target.value);
        setYear(year);
    });


    var svg_prev = null;

    // Another event listener that adds the popup when the user puts their cursor over the tube circles
    map.on('click', 'londonhp', function (e) {
        console.log(e.features[0]);
        console.log(e.features[0].properties);

        if (svg_prev) {

            var svg_parent = document.getElementById('chartContainer');
            svg_parent.removeChild(svg_parent.childNodes[3]);
            console.log(svg_parent);

            var svg_parent1 = document.getElementById('chartContainer1');
            svg_parent1.removeChild(svg_parent1.childNodes[3]);
            console.log(svg_parent1);
        }



        // delete myChart;

        // var mypopup = new mapboxgl.Popup({ offset: [150, 50], closeButton: true });
        if (e.features.length == 1) {
            map.setFilter('highlight', ['==', 'Code', e.features[0].properties.Code]);
        } else {
            map.setFilter('highlight', ['==', 'Code', 'null']);

        }


        // mypopup.setLngLat(e.lngLat).setHTML('<h4>Mean housing price of ' + e.features[0].properties.Area + '</h4><br>' + "2013: " + e.features[0].properties.Value2013 + "<br />2014: " + e.features[0].properties.Value2014 + "<br />2015: " + e.features[0].properties.Value2015 + "<br />2016: " + e.features[0].properties.Value2016 + "<br />2017: " + e.features[0].properties.Value2017 + "<br />").addTo(map);



        var area_name = e.features[0].properties.Area;
        document.getElementById("charttitle").innerHTML = 'Mean House Price in ' + area_name + ' </br>From 2011 to 2017';

        document.getElementById("charttitle1").innerHTML = 'Crime Numbers in ' + area_name + ' </br> Per Year in the Latest 2 Years ';


        var svg = dimple.newSvg("#chartContainer", "100%", '100%');
        svg_prev = svg;
        var svg1 = dimple.newSvg("#chartContainer1", "100%", '100%');

        var chartdata_house = [
            { "Year": "2011", "Price": (e.features[0].properties.Value2011 / 1000000) },
            { "Year": "2012", "Price": (e.features[0].properties.Value2012 / 1000000) },
            { "Year": "2013", "Price": (e.features[0].properties.Value2013 / 1000000) },
            { "Year": "2014", "Price": (e.features[0].properties.Value2014 / 1000000) },
            { "Year": "2015", "Price": (e.features[0].properties.Value2015 / 1000000) },
            { "Year": "2016", "Price": (e.features[0].properties.Value2016 / 1000000) },
            { "Year": "2017", "Price": (e.features[0].properties.Value2017 / 1000000) }

        ];
        var chartdata_crime = [
            { "Categories": "Arson & Damage", "Numbers": (e.features[0].properties['Arson and'] / 2) },
            { "Categories": "Burglary", "Numbers": (e.features[0].properties['Burglary'] / 2) },
            { "Categories": "Drug", "Numbers": (e.features[0].properties['Drug Offen'] / 2) },
            { "Categories": "Against Society", "Numbers": (e.features[0].properties['Miscellane'] / 2) },
            { "Categories": "Weapons", "Numbers": (e.features[0].properties['Possession'] / 2) },
            { "Categories": "Public Order", "Numbers": (e.features[0].properties['Public Ord'] / 2) },
            { "Categories": "Robbery", "Numbers": (e.features[0].properties['Robbery'] / 2) },
            { "Categories": "Theft", "Numbers": (e.features[0].properties['Theft'] / 2) },
            { "Categories": "Vehicle", "Numbers": (e.features[0].properties['Vehicle Of'] / 2) },
            { "Categories": "Violence", "Numbers": (e.features[0].properties['Violence A'] / 2) }
        ];

        console.log(chartdata_house);
        console.log(chartdata_crime);
        var myChart = new dimple.chart(svg, chartdata_house);  // Create the chart
        var myChart1 = new dimple.chart(svg1, chartdata_crime);

        myChart.setBounds("14%", '18%', '75%', '65%');
        myChart1.setBounds("30%", '15%', '58%', '70%');             // Set the chart bounds within the svg container

        myChart.defaultColors = [
            new dimple.color("#54aae3"),
            new dimple.color("#54aae3")
        ];

        myChart1.defaultColors = [
            new dimple.color("#54aae3"),
            new dimple.color("#54aae3")
        ];

        // set mychart 
        var x = myChart.addTimeAxis("x", "Year", "%Y", "%Y");  // Define the x axis. The latter statements define the date format which we want to be year only
        x.timeInterval = 1;

        var y = myChart.addMeasureAxis("y", "Price"); // Define the y axis
        y.ticks = 6;
        y.title = 'House Prices (million pounds)'

        var s = myChart.addSeries(null, dimple.plot.line);
        s.lineMarkers = true;
        s.interpolation = "cardinal";

        myChart.draw(500); // Draw the chart. The number is the animation delay in miliseconds


        svg.selectAll("path.dimple-proj").style("stroke-dasharray", "2"); // Some minor stying changes using the svg selectAll statement. Make the projected data a dashed line and the grid colour lighter.
        svg.selectAll("path.domain").style("stroke", "#ccc");
        svg.selectAll("g.tick line").style("stroke", "#ccc");

        //set mychart1
        var x1 = myChart1.addMeasureAxis('x', 'Numbers');
        x1.title = 'Crime numbers per year';
        x1.ticks = 6;
        console.log(x1);
        x1.addOrderRule('Categories');
        var y1 = myChart1.addCategoryAxis('y', 'Categories');
        y1.title = 'Crime Categories';
        var s1 = myChart1.addSeries(null, dimple.plot.bar);
        s1.interpolation = 'step';
        s.lineWeight = 1;
        myChart1.draw(500);
        svg1.selectAll('path.domain').style('stroke', '#ccc');
        svg1.selectAll('g.tick line').style('stroke', '#ccc');


    });





});

