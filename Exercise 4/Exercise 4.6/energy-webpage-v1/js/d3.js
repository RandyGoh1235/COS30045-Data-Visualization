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
	const xScale = d3.scaleLinear()
		.domain([0, 1200])
		.range([0, 400]);
	const yScale = d3.scaleBand()
		.domain(data.map((d) => d.brand))
		.range([0, 1600]);

	svg
		.selectAll("rect")
		.data(data)
		.join("rect")
		.attr("class", (d) => {
			console.log(d);
			return `bar bar-${d.count}`;
		})
		.attr("x", 0)
		.attr("y", (d) => yScale(d.brand))
		.attr("width", (d) => xScale(d.count))
		.attr("height", yScale.bandwidth())
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