Draw("2010");

function Draw(year) {
    d3.select("svg").html('');
    var svg = d3.select("svg"),
        margin = {
            top: 20,
            right: 100,
            bottom: 10,
            left: 130
        },
        width = (document.body.clientWidth * 0.4) - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom;

    var tooltip = d3.select("body").append("div").attr("class", "toolTip");

    chartColors = ["#045FB4", "#FFA042", "#9A2EFE", "#FFD306"];
    var x = d3.scaleLinear().range([0, width]);
    var y = d3.scaleBand().range([height, 0]);

    var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("income/" + year + ".csv")
        .then(createIncomeVisual)
        .catch(console.err);

    function createIncomeVisual(data) {
        data.forEach(function (d) {
            d['value'] = +d['value'];
        });

        data.sort(function (a, b) {
            return a.value - b.value;
        });

        x.domain([0, d3.max(data, function (d) {
            return d.value;
        })]);
        y.domain(data.map(function (d) {
            return d.Area;
        })).padding(0.1);

        g.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x).ticks(5).tickFormat(function (d) {
                return parseInt(d);
            }).tickSizeInner([-height]));

        g.append("g")
            .attr("class", "y axis")
            .call(d3.axisLeft(y));

        g.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("fill", (d, i) => chartColors[i % 4])
            .attr("x", 0)
            .attr("height", y.bandwidth())
            .attr("y", function (d) {
                return y(d.Area);
            })
            .attr("width", function (d) {
                return x(d.value);
            })
            .on("mousemove", function (d) {
                console.log(d);

                tooltip
                    .style("left", d3.pageX - 50 + "px")
                    .style("top", d3.pageY - 70 + "px")
                    .style("display", "inline-block")
                    .html((d.Area) + "<br>" + (d.value));
            })
            .on("mouseout", function (d) {
                tooltip.style("display", "none");
            });
    }
}