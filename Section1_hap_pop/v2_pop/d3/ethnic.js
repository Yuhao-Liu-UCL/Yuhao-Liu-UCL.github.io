var svg = d3.select("svg#ethnic"),
    margin = { top: 20, right: 0, bottom: -20, left: 70 },
    width = 450
    height = (document.body.clientHeight * 0.32) - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var x = d3.scaleBand()
    .rangeRound([0, width])
    .padding(0.3)
    .align(0.1);

var y = d3.scaleLinear()
    .rangeRound([height, 0]);

var z = d3.scaleOrdinal()
    .range(["#F1948A", "#0072E3", "#52BE80", "#EAC100"]);

var stack = d3.stack()
    .offset(d3.stackOffsetExpand);

d3.csv("d3/ethnic.csv")
    .then(type)
    .then(data => {
        createVisualEthnic(data);
    })
    .catch(err => console.error);

function createVisualEthnic(data) {

    data.sort(function (a, b) { return b[data.columns[1]] / b.total - a[data.columns[1]] / a.total; });

    console.log(data);
    x.domain(data.map(function (d) { return d.Area; }));
    z.domain(data.columns.slice(1));

    var serie = g.selectAll(".serie")
        .data(stack.keys(data.columns.slice(1))(data))
        .enter().append("g")
        .attr("class", "serie")
        .attr("fill", function (d) { return z(d.key); });

    serie.selectAll("rect")
        .data(function (d) { return d; })
        .enter().append("rect")
        .attr("x", function (d) { return x(d.data.Area); })
        .attr("y", function (d) { return y(d[1]); })
        .attr("height", function (d) { return y(d[0]) - y(d[1]); })
        .attr("width", x.bandwidth());

    g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.5em")
        .attr("dy", ".25em")
        .attr("transform", "rotate(-60)")
        .style("font", "12px sans-serif");
        

    g.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y).ticks(10, "%"));

    var legend = serie.append("g")
        .attr("class", "legend")
        .attr("transform", function (d) { var d = d[d.length - 1]; return "translate(" + (x(d.data.Area) + x.bandwidth()) + "," + ((y(d[0]) + y(d[1])) / 2) + ")"; });

    legend.append("line")
        .attr("x1", -6)
        .attr("x2", 6)
        .attr("stroke", "#000");

    legend.append("text")
        .attr("x", 9)
        .attr("dy", "0.35em")
        .attr("fill", "#000")
        .style("font", "13.5px sans-serif")
        .text(function (d) { return d.key; });
}

function type(data) {
    // get the columns/
    let dataColumns = data.columns.slice(1,)

    // parse strings to number and add total values
    data.forEach(entry => {
        let totalEntries = dataColumns.map(col => {
            let value = parseFloat(entry[col]);
            entry[col] = value;

            return value;
        });

        entry.total = totalEntries.reduce((a, b) => a + b, 0);
    });
    return data;
}
