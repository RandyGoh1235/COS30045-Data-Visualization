d3.csv("data/ARE_Spot_Prices.csv", (d) => ({
	year: +d.Year,
	averagePrice: +d["Average Price (notTas-Snowy)"]
})).then((data) => {
	console.log(data);
	console.log("Data types:", typeof data[0]?.year, typeof data[0]?.averagePrice);
	drawLineChart(data);
}).catch((error) => {
	console.error("Unable to load data/ARE_Spot_Prices.csv:", error);
});

const drawLineChart = (data) => {
	const margin = { top: 40, right: 170, bottom: 25, left: 40 };
	const width = 1000;
	const height = 500;
	const innerWidth = width - margin.left - margin.right;
	const innerHeight = height - margin.top - margin.bottom;
	const svg = d3.select("#line-chart")
		.append("svg")
		.attr("viewBox", `0 0 ${width} ${height}`)
		.style("border", "1px solid black");
	const innerChart = svg.append("g")
		.attr("transform", `translate(${margin.left}, ${margin.top})`);

	const xScale = d3.scaleLinear()
		.domain(d3.extent(data, (d) => d.year))
		.range([0, innerWidth]);

	const yScale = d3.scaleLinear()
		.domain([0, d3.max(data, (d) => d.averagePrice)])
		.range([innerHeight, 0]);

	const lineGenerator = d3.line()
		.x((d) => xScale(d.year))
		.y((d) => yScale(d.averagePrice));

	const bottomAxis = d3.axisBottom(xScale)
		.tickFormat(d3.format("d"));
	const leftAxis = d3.axisLeft(yScale);

	innerChart
		.append("path")
		.attr("d", lineGenerator(data))
		.attr("fill", "none")
		.attr("stroke", "green");

	innerChart
		.append("g")
		.attr("transform", `translate(0,${innerHeight})`)
		.call(bottomAxis);

	innerChart
		.append("g")
		.call(leftAxis);

	innerChart
		.append("text")
		.text("Average Spot Price ($/MWh)")
		.attr("transform", "rotate(-90)")
		.attr("x", -innerHeight / 2)
		.attr("y", -margin.left + 15)
		.attr("text-anchor", "middle");

	innerChart
		.selectAll("circle")
		.data(data)
		.join("circle")
		.attr("r", 4)
		.attr("cx", (d) => xScale(d.year))
		.attr("cy", (d) => yScale(d.averagePrice))
		.attr("fill", "green");
};
