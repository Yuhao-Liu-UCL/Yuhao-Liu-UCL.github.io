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

    for (var i = 0; i < CityData.length; i++) {            
        var el = document.createElement("option");
        el.textContent = CityData[i].Area;
        el.value = CityData[i].Index;
        cityMenu.appendChild(el);
    }

    function SetCityData(index) {  

        console.log(CityData[index]); 

        document.getElementById("charttitle").innerHTML = CityData[index].Area; 
        
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
    var svg = dimple.newSvg("#chart-container", "550", height); 

    var myChart = new dimple.chart(svg, chartdata);  

    myChart.defaultColors = [
        new dimple.color("#1114FC"),
        new dimple.color("#1114FC")
    ];


    var x = myChart.addTimeAxis("x", "Year", "%Y", "%Y");  
    x.timeInterval = 1;

    var y = myChart.addMeasureAxis("y", "Population");
    y.ticks = 4;

    var s = myChart.addSeries("City", dimple.plot.line);
    s.lineMarkers = true;
    s.interpolation = "cardinal";

    document.getElementById("CityMenu").onchange = function () {    
        var x = document.getElementById("CityMenu").value;
        console.log(x);
        SetCityData(x);   

        svg.selectAll(".dimple-marker,.dimple-marker-back").remove(); 

        myChart.data = chartdata; 
        myChart.draw(500);
    }
}

