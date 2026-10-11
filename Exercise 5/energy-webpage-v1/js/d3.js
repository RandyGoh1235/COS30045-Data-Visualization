d3.csv("data/Data_exercise 5.1-1.csv", (d) => ({
	screenTech: d.Screen_Tech,
	energyConsumption: +d["Mean(Labelled energy consumption (kWh/year))"]
})).then((data) => {
	console.log(data);
	console.log(data.length);
	console.log("Data types:", typeof data[0]?.screenTech, typeof data[0]?.energyConsumption);
	console.log(d3.max(data, (d) => d.energyConsumption));
	console.log(d3.min(data, (d) => d.energyConsumption));

	data.sort((a, b) => b.energyConsumption - a.energyConsumption);
	drawBarChart(data);
}).catch((error) => {
	console.error("Unable to load data/Data_exercise 5.1-1.csv:", error);
});

const drawBarChart = (data) => {
	const margin = { top: 40, right: 170, bottom: 25, left: 40 };
	const width = 1000;
	const height = 500;
	const innerWidth = width - margin.left - margin.right;
	const innerHeight = height - margin.top - margin.bottom;
	const svg = d3.select("#bar-chart")
		.append("svg")
		.attr("viewBox", `0 0 ${width} ${height}`)
		.style("border", "1px solid black");
	const innerChart = svg.append("g")
		.attr("transform", `translate(${margin.left},${margin.top})`);

	const xScale = d3.scaleLinear()
		.domain([0, d3.max(data, (d) => d.energyConsumption)])
		.range([0, innerWidth]);

	const yScale = d3.scaleBand()
		.domain(data.map((d) => d.screenTech))
		.range([0, innerHeight])
		.padding(0.1);

	innerChart
		.selectAll("rect.bar")
		.data(data)
		.join("rect")
		.attr("class", "bar")
		.attr("width", (d) => xScale(d.energyConsumption))
		.attr("height", yScale.bandwidth())
		.attr("fill", "blue")
		.attr("x", 0)
		.attr("y", (d) => yScale(d.screenTech));
};
