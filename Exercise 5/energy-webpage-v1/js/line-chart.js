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
};