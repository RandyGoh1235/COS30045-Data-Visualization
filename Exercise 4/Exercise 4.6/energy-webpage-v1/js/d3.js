const svg = d3.select(".responsive-svg-container")
	.append("svg")
	.attr("viewBox", "0 0 500 1600")
	.style("border", "1px solid black");

svg.append("rect")
	.attr("x", 10)
	.attr("y", 10)
	.attr("width", 414)
	.attr("height", 16)
	.attr("fill", "blue");

const drawBarChart = (data) => {
	const barHeight = 20;
	const barSpacing = 5;
	const xScale = d3.scaleLinear()
		.domain([0, 1200])
		.range([0, 400]);

	svg
		.selectAll("rect")
		.data(data)
		.join("rect")
		.attr("class", (d) => {
			console.log(d);
			return `bar bar-${d.count}`;
		})
		.attr("x", 0)
		.attr("y", (d, i) => i * (barHeight + barSpacing))
		.attr("width", (d) => d.count)
		.attr("height", barHeight)
		.attr("fill", "blue");
};

d3.csv("data/tvBrandCount.csv", (d) => {
	return {
		brand: d.brand,
		count: +d.count
	};
}).then((data) => {
	data.sort((a, b) => b.count - a.count);
	drawBarChart(data);
});