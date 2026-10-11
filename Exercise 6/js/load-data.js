d3.csv("data/Ex6_TVdata_withStar.csv", (d) => ({
	...d,
	screenSize: +d.screenSize,
	star: +d.star,
	energyConsumption: +d.energyConsumption
}))
	.then((data) => {
		console.log(data);
		drawHistogram(data);
		populateFilters(data);
		drawScatterplot(data);
		createTooltip(data);
		handleMouseEvents();
	})
	.catch((error) => {
		console.error("Unable to load data/Ex6_TVdata_withStar.csv:", error);
	});
