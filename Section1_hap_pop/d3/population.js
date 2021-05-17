d3.csv("./d3/population.csv")
    .then(data => {
        console.log(data);
        createVisual(data);
    })
    .catch(err => console.error);

function createVisual(CityData) {
    console.log(CityData);
    var chartdata;
    var cityMenu = document.getElementById("CityMenu");

    for (var i = 0; i < CityData.length; i++) {            // In this loop we add the names of all the Cities in the CSV to the drop down menu
        var el = document.createElement("option");
        el.textContent = CityData[i].Area;
        el.value = CityData[i].Index;
        cityMenu.appendChild(el);
    }

    function SetCityData(index) {   // Function that extracts the population timeseries for the selected city

        console.log(CityData[index]); // Show the data of the row in the console

        document.getElementById("charttitle").innerHTML = CityData[index].Area; // The name of the city and country is inserted into the chart title

        // Dimple requires each data point on a time series to be a separate row. Below we insert the population data from the CityData array into a new array of JSON objects in the required format
        chartdata = [
            { "City": "Hist", "Year": "2010", "Population": (CityData[index].pop2010) },
            { "City": "Hist", "Year": "2011", "Population": (CityData[index].pop2011) },
            { "City": "Hist", "Year": "2012", "Population": (CityData[index].pop2012) },
            { "City": "Hist", "Year": "2013", "Population": (CityData[index].pop2013) },
            { "City": "Hist", "Year": "2014", "Population": (CityData[index].pop2014) },
            { "City": "Hist", "Year": "2015", "Population": (CityData[index].pop2015) },
            { "City": "Hist", "Year": "2016", "Population": (CityData[index].pop2016) },
            { "City": "Hist", "Year": "2017", "Population": (CityData[index].pop2017) },
            { "City": "Hist", "Year": "2018", "Population": (CityData[index].pop2018) },
            { "City": "Hist", "Year": "2019", "Population": (CityData[index].pop2019) },
            { "City": "Hist", "Year": "2020", "Population": (CityData[index].pop2020) },
        ];

    }

    SetCityData(0);

    var height = document.body.clientHeight * 0.45;
    var svg = dimple.newSvg("#chart-container", "520", height); // The chart is an svg variable assigned to the chartcontainer div. It's width and height are also assigned here

    var myChart = new dimple.chart(svg, chartdata);  // Create the chart
    // myChart.setBounds(60, 15, 600, 300);            // Set the chart bounds within the svg container

    myChart.defaultColors = [
        new dimple.color("#1114FC"),
        new dimple.color("#1114FC")
    ];


    var x = myChart.addTimeAxis("x", "Year", "%Y", "%Y");  // Define the x axis. The latter statements define the date format which we want to be year only
    x.timeInterval = 1;

    var y = myChart.addMeasureAxis("y", "Population"); // Define the y axis
    y.ticks = 4;

    var s = myChart.addSeries("City", dimple.plot.line);
    s.lineMarkers = true;
    s.interpolation = "cardinal";

    document.getElementById("CityMenu").onchange = function () {    // This is the event listener that runs when the user changes the menu
        var x = document.getElementById("CityMenu").value;
        console.log(x);
        SetCityData(x);   // Run the function that will update chartdata with the user selected city

        svg.selectAll(".dimple-marker,.dimple-marker-back").remove(); // There's a bug where it doesn't remove the markers from the previous series. 

        myChart.data = chartdata; // Update the chart with the new chartdata
        myChart.draw(500);
    }
}

