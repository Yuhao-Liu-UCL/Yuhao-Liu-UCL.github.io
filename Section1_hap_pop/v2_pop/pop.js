mapboxgl.accessToken = 'pk.eyJ1IjoiYWJjcXFxMTIzIiwiYSI6ImNrbHduMjd4bjJrZTcybm53YmIzeXNyejIifQ.sURUBDkqdysOetn6MgfHhQ';

var map = new mapboxgl.Map({
	container: 'map',
	style: 'mapbox://styles/abcqqq123/cko1ecy0m0s9017p9wl3hokcs',
	center: [-0.28, 51.5],
	zoom: 9.7
});

var activeYear = 2010;
let colors = ["#ECF5FF", "#ACD6FF", "#46A3FF", "#0072E3", "#005AB5", "#003060"];


map.on("load", function (e) {
	map.addSource("london-population", {
		type: 'geojson',
		data: 'data/density.json'
	});

	updatePopulationVisual(activeYear);

	map.on("click", "london-pop-density", function (e) {
		var features = e.features;

		if (features[0]) {
			let feature = features[0];

			let featureContent = "<div class='popup-content'>" +
				"<div class='popup-title'>" + feature.properties.name + "</div>" +
				"<div class='pop-value' > Density " + feature.properties[activeYear] + " /sqkm" + "</div>" +
				"</div>";

			new mapboxgl.Popup()
				.setLngLat(e.lngLat)
				.setHTML(featureContent)
				.addTo(map);
		}
	});

	map.on('mouseenter', 'london-pop-density', function () {
		map.getCanvas().style.cursor = 'pointer';
	});

	map.on('mouseleave', 'london-pop-density', function () {
		map.getCanvas().style.cursor = '';
	});
});

var dataTime = d3.range(0, 11, 1).map(function (d) {
	return new Date(2010 + d, 1, 1);
});

var sliderWidth = document.body.clientWidth * 0.25;
//slider
var sliderTime = d3
  	.sliderBottom()
  	.min(d3.min(dataTime))
  	.max(d3.max(dataTime))
  	.width(sliderWidth)
  	.tickFormat(d3.timeFormat('%Y'))
  	.tickValues(dataTime)
  	.tickPadding(1)
  	.default(new Date(2010, 1, 1))
  	.fill("blue")
	.on("end", val => {
		console.log(val);
		let year = d3.timeFormat("%Y")(val);

		if(activeYear != year) {
			activeYear = year;
			updatePopulationVisual(year);
		}
	})
	.on("onchange", val => {
		console.log(val);
		let year = d3.timeFormat("%Y")(val);

		if(activeYear != year) {
			activeYear = year;
			updatePopulationVisual(year);
		}
  	});

var gTime = d3
  .select('div#slider-time')
  .append('svg')
  .attr('width', 460)
  .attr('height', 70)
  .append('g')
  .attr('transform', 'translate(30,30)');

gTime.call(sliderTime);

function updatePopulationVisual(year) {
	console.log(year);

	if (map.getLayer('london-pop-density')) {
		map.removeLayer('london-pop-density');
		map.removeLayer('london-pop-density-line');
	}

	map.addLayer({
		id: 'london-pop-density',
		source: 'london-population',
		type: 'fill',
		paint: {
			'fill-color': [
				'interpolate',
				['linear'],
				['get', year.toString()],
				3000,
				colors[0],
				6000,
				colors[1],
				9000,
				colors[2],
				11000,
				colors[3],
				13000,
				colors[4],
				16000,
				colors[5]
			],
			'fill-opacity': 0.88
		}
	});

	map.addLayer({
		id: 'london-pop-density-line',
		source: 'london-population',
		type: 'line',
		paint: {
			'line-color': 'grey',
			'line-width': 1
		}
	});
}

var legendContainer = document.getElementById("legend-bar");

values = [2000, 5000, 8000, 10000, 12000, 15000];

colors.forEach((color, i) => {
	let div = document.createElement("div");
	div.className = 'color-segment'

	div.innerHTML += "<div style='width:37px; margin-right:5px; height:22px; background-color:" + color + "'></div>"
	div.innerHTML += "<span>" + values[i] + "</span> - " +
		"<span>" + (values[i + 1] || "+") + "</span>";

	legendContainer.append(div);
});

