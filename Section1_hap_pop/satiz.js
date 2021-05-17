mapboxgl.accessToken = 'pk.eyJ1IjoiYWJjcXFxMTIzIiwiYSI6ImNrbHduMjd4bjJrZTcybm53YmIzeXNyejIifQ.sURUBDkqdysOetn6MgfHhQ';

var londonCentroids, newzpos=1;
var markers = {};
var markersOnScreen = {};

var map = new mapboxgl.Map({
	container: 'map',
	style: 'mapbox://styles/abcqqq123/ckohoqkaw3h2b18mglfnt87fp',
	center:[-0.055, 51.495],
	zoom:9.9
	
});
function filterBy(index) {
	var filters = ['==', 'year', years[index]];
	map.setFilter('circles', filters);
	map.setFilter('labels', filters);
	document.getElementById('year').textContent = years[index];
}

map.on('load', function () {
	map.addControl(new mapboxgl.NavigationControl());

	map.addSource('tileset_data', {
		"url": "mapbox://abcqqq123.0h7a1k0l",
		"type": "vector"
	});
	map.addLayer({
		'id': 'circles',
		'type': 'circle',
		'source': 'tileset_data',
		'source-layer': 'life-satiz-8i95yc',
		'paint': {
			'circle-color': [
				'interpolate',
				['linear'],
				['get', 'rate'],
				17,
				'#F9F34C',
				38,
				'#39a3fa'
			],
			'circle-opacity': 0.75,
			'circle-radius': [
				'interpolate',
				['linear'],
				['get', 'rate'],
				18,
				27,
				33,
				38,
			]
		}
	});

	map.addLayer({
		'id': 'labels',
		'type': 'symbol',
		'source': 'tileset_data',
		'source-layer': 'life-satiz-8i95yc',
		'layout': {
			'text-field': [
				'concat',
				['to-string', ['get', 'rate']],
				'%'
			],
			'text-font': [
				'Open Sans Bold',
				'Arial Unicode MS Bold'
			],
			'text-size': 12
		},
		'paint': {
			'text-color': 'rgba(0,0,0,0.5)'
		}
	});

	
});

// add in event lister
map.on('load', function(e) {
	//cluster bubble
    map.on('load', function () {
        map.addControl(new mapboxgl.NavigationControl());

        map.addSource('tileset_data', {
            "url": "mapbox://abcqqq123.0h7a1k0l",
            "type": "vector"
        });
        map.addLayer({
            'id': 'circles',
            'type': 'circle',
            'source': 'tileset_data',
            'source-layer': 'life-satiz-8i95yc',
            'paint': {
                'circle-color': [
                    'interpolate',
                    ['linear'],
                    ['get', 'rate'],
                    17,
                    '#FAD24C',
                    38,
                    '#10B1E0'
                ],
                'circle-opacity': 0.75,
                'circle-radius': [
                    'interpolate',
                    ['linear'],
                    ['get', 'rate'],
                    20,
                    27,
                    36,
                    38,
                ]
            }
        });

        map.addLayer({
            'id': 'labels',
            'type': 'symbol',
            'source': 'tileset_data',
            'source-layer': 'life-satiz-8i95yc',
            'layout': {
                'text-field': [
                    'concat',
                    ['to-string', ['get', 'rate']],
                    '%'
                ],
                'text-font': [
                    'Open Sans Bold',
                    'Arial Unicode MS Bold'
                ],
                'text-size': 12
            },
            'paint': {
                'text-color': 'rgba(0,0,0,0.5)'
            }
        });

        
    });

	//Add Hover effect
	map.addLayer({                  
		id: 'LocalAuthorities',
		type: 'fill',
		source: {
		  type: 'vector',
		  url: 'mapbox://abcqqq123.7q6newws' 
		},
		'source-layer': 'london_satiz-1hqdvw', 
		'layout': {
			'visibility': 'visible'
		},
		paint: {
			'fill-color': '#fff',
			'fill-opacity': 0
			}
	  });

map.addLayer({                  
		id: 'lahighlight',
		type: 'line',
		source: {
		  type: 'vector',
		  url: 'mapbox://abcqqq123.7q6newws' 
		},
		'source-layer': 'london_satiz-1hqdvw', 
		'layout': {
			'visibility': 'visible'
		},
		paint: {
			'line-color': '#7A5D56',
			'line-width': 3
			},
		filter: ['==','name','empty']
	  });


map.on('mousemove', function(e) {       
	  var la = map.queryRenderedFeatures(e.point, {   
		layers: ['LocalAuthorities']
	  });


	if (la.length==1) {   

	map.setFilter('lahighlight', ['==','name',la[0].properties.name]);  
	console.log(la[0].properties.name);
	document.getElementById('laname').innerHTML = la[0].properties.name; 
	console.log(la[0].id);
	console.log(la);

	} else {
	map.setFilter('lahighlight', ['==','name','null']);
	console.log('No features');
	document.getElementById('laname').innerHTML = "Hover over a local authority";
	}


	});

	document
		.getElementById('slider')
		.addEventListener('input', function (e) {
			var year = parseInt(e.target.value, 10);
			filterBy(year);
		});

});

// donut
var summaryData = [{name:"Very High", value:27.82}, {name:"High", value:57.2}, {name:"Medium", value:14.98}];

let width = 300, height = 300;
var svg = d3.select("#donut-svg").attr("width", width).attr("height", height).style("pointer-events","none");
var g;


var radius = Math.min(width, height) / 2 - 10;
var pie = d3.pie().value(function(d) { return d.value});

var color = d3.scaleSequential(d3.interpolate("#E9C913","#5FC5E5"))
    .domain([0,60])
    

var data_ready = pie(summaryData);
g = svg.append("g").attr("transform", "translate(150, 150)");

var arcGen = d3.arc()
				.innerRadius(80)
				.outerRadius(radius)


g.selectAll("path.donut")
	.data(data_ready)
	.enter()
	.append("path")
	.attr("class", "donut")
	.attr("d", arcGen)
	.attr("fill", d => color(d.value))
    .attr("stroke", "transparent")
    .attr("stroke-width", 1);

// donut's text
g.selectAll("newtext")
	.data(data_ready)
	.enter()
	.append("text")
	.attr("x",d => d3.pointRadial((d.startAngle + d.endAngle - 0.1)/2, (80+radius)/2)[0])
	.attr("y",d => d3.pointRadial((d.startAngle + d.endAngle - 0.1)/2, (80+radius)/2)[1])
	.attr("text-anchor", "middle")
	.text(d => d.data.value + "%")
	.attr("font-size", "15px")
	.attr("fill", "black")

// donut's legend 
var size = 19;
g.selectAll("item")
	.data(data_ready)
	.enter()
	.append("rect")
	.attr("x", -30)
	.attr("y", function(d, i) { return -30 + i*(size+5) })
	.attr("width", size)
	.attr("height", size)
	.attr("fill", d => color(d.value))

g.selectAll("legend-label")
	.data(data_ready)
	.enter()
	.append("text")
	.attr("x", -0)
	.attr("y", function(d, i) { return  -15 + i*(size+5)})
	.text(d => d.data.name)
	.attr("font-size", "15px")
	.attr("fill", "black")
