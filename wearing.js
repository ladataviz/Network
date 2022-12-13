async function franceNetworkChart() {

    var data = await d3.json("./network.json")
    console.log(data)

    var height = 530
    var width = 540

    var links = data.links.map(d => Object.create(d));
    var nodes = data.nodes.map(d => Object.create(d));

    var simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links)
            .id(d => d.id)
            .distance(10))
        .force("charge", d3.forceManyBody().strength(-20))
        //.force('collision', d3.forceCollide().radius(0.1))
        .force("x", d3.forceX())
        .force("y", d3.forceY())
        .force("center", d3.forceCenter());

    var svg = d3.select("#france")
        .append("svg")
        .attr("viewBox", [-width / 2, -height / 2, width, height]);

    var link = svg.append("g")
        .attr("stroke", "#ffe3d8")
        .attr("stroke-opacity", 0.6)
        .selectAll("line")
        .data(links)
        .join("line")
        .attr("stroke-width", 0.05);

    const node = svg.append("g")
        .selectAll("circle")
        .data(nodes)
        .join("circle")
        .attr("r", 0.5)
        .attr("fill", "#f2d974")
        .attr("fill-opacity", 0.4);

    simulation.on("tick", () => {
        link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        node
            .attr("cx", d => d.x)
            .attr("cy", d => d.y);
    });

    var tooltipText = node.append("title")
        .text(d => d.id);

    console.log(nodes)


}
franceNetworkChart()