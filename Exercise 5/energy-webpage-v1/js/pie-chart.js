d3.csv("data/Data_exercise 5.3.csv", (d) => ({
	screenSizeCategory: d.Screensize_Category,
	count: +d.Count
})).then((data) => {
	console.log(data);
	console.log("Data types:", typeof data[0]?.screenSizeCategory, typeof data[0]?.count);
	drawDonutChart(data);
}).catch((error) => {
	console.error("Unable to load data/Data_exercise 5.3.csv:", error);
});

const drawDonutChart = (data) => {
	const width = 1000;
	const height = 500;
	const radius = Math.min(width, height) / 2 - 20;
	const svg = d3.select("#donut-chart")
		.append("svg")
		.attr("viewBox", `0 0 ${width} ${height}`)
		.style("border", "1px solid black");
	const innerChart = svg.append("g")
		.attr("transform", `translate(${width / 2}, ${height / 2})`);
	const color = d3.scaleOrdinal()
		.domain(data.map((d) => d.screenSizeCategory))
		.range(d3.schemeSet2);
	const pie = d3.pie()
		.value((d) => d.count)
		.sort(null);
	const arcGenerator = d3.arc()
		.innerRadius(radius * 0.6)
		.outerRadius(radius * 1);

	innerChart
		.selectAll("path")
		.data(pie(data))
		.join("path")
		.attr("d", arcGenerator)
		.attr("fill", (d) => color(d.data.screenSizeCategory))
		.attr("stroke", "white")
		.attr("stroke-width", 2);

	innerChart
		.selectAll("text")
		.data(pie(data))
		.join("text")
		.attr("transform", (d) => `translate(${arcGenerator.centroid(d)})`)
		.attr("text-anchor", "middle")
		.attr("dominant-baseline", "central")
		.text((d) => d.data.screenSizeCategory);
};
