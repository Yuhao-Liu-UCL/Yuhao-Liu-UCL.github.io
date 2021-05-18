mapboxgl.accessToken = 'pk.eyJ1IjoiYWJjcXFxMTIzIiwiYSI6ImNrbHduMjd4bjJrZTcybm53YmIzeXNyejIifQ.sURUBDkqdysOetn6MgfHhQ';

var map = new mapboxgl.Map({
	container: 'map',
	style: 'mapbox://styles/abcqqq123/cko1ecy0m0s9017p9wl3hokcs',
	center: [-0.4, 51.47],
	zoom: 9.5
});

var activeAge = 'children';
var breakPoints = {
	children: [13, 22],
	teenager: [4, 9],
	adult: [59, 74],
	elder: [5, 17]
};

let colors = ['#FFFCEC', '#FFF0AC', '#FFE153', '#FFD306', '#C6A300', '#AE8F00']
map.on("load", function (e) {
	map.addSource("income-age", {
		type: 'geojson',
		data: 'data/age_income.geojson'
	});

	updateLayerByAge(activeAge);


	map.on("click", "income-age", function (e) {
		var features = e.features;

		if (features[0]) {
			let feature = features[0];

			let popupContent = "<div class='popup-content'>" +
				"<div class='popup-title'><strong>" + feature.properties.name + "</strong></div>" +
				"<div class='popup-entry' >" + activeAge + feature.properties[activeAge] + " %</div>" +
				"</div>";

			// create a popup
			new mapboxgl.Popup()
				.setLngLat(e.lngLat)
				.setHTML(popupContent)
				.addTo(map);
		}
	});

	// Change the cursor to a pointer when the mouse is over the states layer.
	map.on('mouseenter', 'income-age', function () {
		map.getCanvas().style.cursor = 'pointer';
	});

	// Change it back to a pointer when it leaves.
	map.on('mouseleave', 'income-age', function () {
		map.getCanvas().style.cursor = '';
	});
});


function updateLayerByAge(age) {
	if (map.getLayer('income-age')) {
		map.removeLayer('income-age');
		map.removeLayer('income-age-line');
	}

	let values = scaleData(age);
	updateLegend(values);
	map.addLayer({
		id: 'income-age',
		source: 'income-age',
		type: 'fill',
		paint: {
			'fill-color': [
				'interpolate',
				['linear'],
				['get', age.toString()],
				values[0],
				colors[0],
				values[1],
				colors[1],
				values[2],
				colors[2],
				values[3],
				colors[3],
				values[4],
				colors[4],
				values[5],
				colors[5]
			],
			'fill-opacity': 0.85
		}
	});

	map.addLayer({
		id: 'income-age-line',
		source: 'income-age',
		type: 'line',
		paint: {
			'line-color': 'grey',
			'line-width': 0.6
		}
	});
}

function scaleData(age) {
	// create the limits
	let activeAgeGroup = breakPoints[age];
	let changeRate = (activeAgeGroup[1] - activeAgeGroup[0]) / 5;

	let range = d3.range(activeAgeGroup[0], activeAgeGroup[1] + changeRate, changeRate);
	console.log(range);

	return range;
}


// update the active visual
var btnAgeCategory = document.querySelectorAll(".btn-category");
btnAgeCategory.forEach(btn => {
	btn.onclick = function (e) {
		// clear previous active 
		toggleActiveClass();

		// add active class
		btn.classList.add("active");

		// get the age
		let { age } = e.target.dataset;

		activeAge = age;

		// update the visual
		updateLayerByAge(age);

	};
});

function toggleActiveClass() {
	btnAgeCategory.forEach(btn => btn.classList.remove("active"));
}

// create the legend
var legendContainer = document.getElementById("legend-bar");
var activeBreakPoint = breakPoints[activeAge];
var activeValues = scaleData(activeAge);

updateLegend(activeValues);
function updateLegend(activeValues) {
	legendContainer.innerHTML = "";

	colors.forEach((color, i) => {
		let div = document.createElement("div");

		// console.log(i);
		// console.log(activeValues[i]);
		div.innerHTML += "<div style='width:35px; margin-right:5px; height:20px; background-color:" + color + "'></div>"
		div.innerHTML += "<span>" + activeValues[i] + "</span> - " +
			"<span>" + (activeValues[i + 1] || "+") + "</span>";

		legendContainer.append(div);
	});

}