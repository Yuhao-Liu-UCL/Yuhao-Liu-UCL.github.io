mapboxgl.accessToken = 'pk.eyJ1IjoiaXJlbmV5YW5nNzI1IiwiYSI6ImNrazVlZGgwdzA0c3cyb29hb2JmZTQyNzMifQ.rNgnbwVoEYQGmvu79w07Sw';
const mymap = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/ireneyang725/ckofs2m2e5aby17o2gzpz1x0y',
  center: [-0.1267983362701518, 51.51976021730615],
  zoom: 10,
  bearing: 0,
  pitch: 60
});
mymap.keyboard.disable();
// the route of New Year Parade
mymap.on('load', function () {
  mymap.addSource('route', {
    'type': 'geojson',
    'data': {
      'type': 'Feature',
      'properties': {},
      'geometry': {
        'type': 'LineString',
        'coordinates': [

          [-0.1261320407170856, 51.5010675068452],
          [-0.12610892658088085, 51.50321222847699],
          [-0.1264451259872231, 51.504880491307674],
          [-0.12769992877318204, 51.50740139621277],
          [-0.13106825662418686, 51.50780018386611],
          [-0.132569359253439, 51.50726466821382],
          [-0.1347477887658423, 51.509737102895734],
          [-0.14212515900472783, 51.50710515177284]

        ]
      }
    }
  });
  mymap.addLayer({
    'id': 'route',
    'type': 'line',
    'source': 'route',
    'layout': {
      'line-join': 'round',
      'line-cap': 'round'
    },
    'paint': {
      'line-color': '#C70039',
      'line-width': 2
    }
  });
});

mymap.on('load', function () {

  var geoData = {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [-0.12612227444148974, 51.50102147408482]
        },
        "properties": {
          "ID": 1,
          "Event": "London’s New Year’s Day Parade",
          "image": "<img src=\"pictures/LNYDP.jpg\" >",
          "icon": "url(parade.jpg)"
        }
      },

      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [-0.19727230039847982, 51.48894868363205]
        },
        "properties": {
          "ID": 2,
          "Event": "The London Book Fair",
          "image": "<img src=\"pictures/LBF.jpg\" >",
          "icon": "\"arrow\""
        }
      },

      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [0.007360915713003898, 51.47356974062152]
        },
        "properties": {
          "ID": 3,
          "Event": "London Marathon",
          "image": "<img src=\"pictures/London Marathon.jpg\" >",
          "icon": "url(marathon.jpg)"
        }
      },

      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates":
            [-0.15830486931528054, 51.48755210341916]
        },
        "properties": {
          "ID": 4,
          "Event": "Chelsea Flower Show",
          "image": "<img src=\"pictures/flowershow.jpg\" >",
          "icon": "\"arrow\""
        }
      },

      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates":
            [-0.1288895584035439, 51.50464446030587]
        },
        "properties": {
          "ID": 5,
          "Event": "Trooping the Colour",
          "image": "<img src=\"pictures/trooping the color.jpg\" >",
          "icon": "\"arrow\""
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates":
            [-0.1428227294296026, 51.51733551061785]
        },
        "properties": {
          "ID": 6,
          "Event": "Pride in London",
          "image": "<img src=\"pictures/Pride in London.jpg\" >",
          "icon": "url(pride.jpg)"
        }
      },

      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [-0.33776062789879946, 51.4037167938771]
        },
        "properties": {
          "ID": 7,
          "Event": "Hampton Court Garden Festival",
          "image": "<img src=\"pictures/Hampton Court Garden Festival.jpg\" >",
          "icon": "\"marker\""
        }
      },

      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates":
            [-0.17739818832988466, 51.5010423539217]
        },
        "properties": {
          "ID": 8,
          "Event": "The Proms",
          "image": "<img src=\"pictures/Proms.jpg\" >",
          "icon": "url(prom.jpg)"
        }
      },

      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates":
            [-0.07925447650633295, 51.4839869940794]
        },
        "properties": {
          "ID": 9,
          "Event": "Carnaval del Pueblo",
          "image": "<img src=\"pictures/Carnaval.jpg\" >",
          "icon": "url(carnival.jpg)"
        }
      },

      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates":
            [-0.20903583642066328, 51.516047713087914]
        },
        "properties": {
          "ID": 10,
          "Event": "Notting Hill Carnival",
          "image": "<img src=\"pictures/Notting Hill Carnival.jpg\" >",
          "icon": "url(carnival.jpg)"
        }
      },

      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates":
            [-0.08950902891860307, 51.513433998636685]
        },
        "properties": {
          "ID": 11,
          "Event": "Lord Mayor Show",
          "image": "<img src=\"pictures/Lord Mayor's Show.jpg\" >",
          "icon": "url(parade.jpg)"
        }
      },

      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates":
            [-0.14057924103241667, 51.51314054014866]
        },
        "properties": {
          "ID": 12,
          "Event": "Christmas Event",
          "image": "<img src=\"pictures/Christmas.jpg\" >",
          "icon": "\"arrow\""
        }
      },
    ]
  }


  geoData.features.forEach(function (marker) {

    var popup = new mapboxgl.Popup()
      .setHTML(marker.properties.image);

    // create a HTML element for each feature
    var el = document.createElement('div');
    el.className = 'marker';
    el.style.backgroundImage = marker.properties.icon

    // make a marker for each feature and add to the map
    const myMarker = new mapboxgl.Marker(el, {
      offset: [0, -25]
    })
      .setLngLat(marker.geometry.coordinates)
      .setPopup(popup)
      .addTo(mymap);

    const markerDiv = myMarker.getElement();

    markerDiv.addEventListener('mouseenter', () => myMarker.togglePopup());
    markerDiv.addEventListener('mouseleave', () => myMarker.togglePopup());
  });



});

var contents = {
  'begin': {
    center: [-0.1267983362701518, 51.51976021730615],
    zoom: 10,
    bearing: 0,
    pitch: 60
  },
  'London’s New Year’s Day Parade': {
    bearing: 0,
    center: [-0.12612227444148974, 51.50102147408482],
    zoom: 16,
    pitch: 20,
    speed: 0.6
  },
  'The London Book Fair': {
    bearing: 0,
    center: [-0.19727230039847982, 51.48894868363205],
    zoom: 16,
    pitch: 20,
    speed: 0.6
  },
  'London Marathon': {
    bearing: 0,
    center: [0.007360915713003898, 51.47356974062152],
    zoom: 12,
    pitch: 20,
    speed: 0.6
  },
  'Chelsea Flower Show': {
    bearing: 0,
    center: [-0.15830486931528054, 51.48755210341916],
    zoom: 17,
    pitch: 20,
    speed: 0.6
  },
  'Trooping the Colour': {
    bearing: 0,
    center: [-0.12797392478147304, 51.50477606701285],
    zoom: 17,
    pitch: 30,
    speed: 0.6
  },
  'Pride in London': {
    bearing: 0,
    center: [-0.14698021980939582, 51.51566039286941],
    zoom: 15,
    pitch: 20,
    speed: 0.6
  },

  'Hampton Court Garden Festival': {
    bearing: 0,
    center: [-0.33776062789879946, 51.4037167938771],
    zoom: 18,
    pitch: 20,
    speed: 0.6
  },
  'The Proms': {
    bearing: 0,
    center: [-0.17739818832988466, 51.5010423539217],
    zoom: 18,
    pitch: 20,
    speed: 0.6
  },
  'Carnaval del Pueblo': {
    bearing: 0,
    center: [-0.07925447650633295, 51.4839869940794],
    zoom: 15,
    pitch: 20,
    speed: 0.6
  },
  'Notting Hill Carnival': {
    bearing: 0,
    center: [-0.20903583642066328, 51.516047713087914],
    zoom: 14,
    pitch: 20,
    speed: 0.6
  },
  'Lord Mayor Show': {
    bearing: 27,
    center: [-0.08950902891860307, 51.513433998636685],
    zoom: 14,
    pitch: 20,
    speed: 0.6
  },
  'Christmas Event': {
    bearing: 27,
    center: [-0.14057924103241667, 51.51314054014866],
    zoom: 18,
    pitch: 20,
    speed: 0.6
  },

};

