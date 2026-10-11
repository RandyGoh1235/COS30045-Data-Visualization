const svg = d3.select(".responsive-svg-container")
	.append("svg")
	.attr("viewBox", "0 0 1200 1600")
	.style("border", "1px solid black");

svg.append("rect")
	.attr("x", 10)
	.attr("y", 10)
	.attr("width", 414)
	.attr("height", 16)
	.attr("fill", "blue");

const drawBarChart = (data) => {
	svg
		.selectAll("rect")
		.data(data)
		.join("rect");
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