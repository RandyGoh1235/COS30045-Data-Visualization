d3.csv("data/Ex6_TVdata_withStar.csv")
	.then((data) => {
		console.log(data);
		drawHistogram(data);
	})
	.catch((error) => {
		console.error("Unable to load data/Ex6_TVdata_withStar.csv:", error);
	});
