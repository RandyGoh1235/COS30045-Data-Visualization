const drawHistogram = (data) => {
	const bins = binGenerator(data);
	console.log(bins);

	const minEng = bins[0].x0;
	const maxEng = bins[bins.length - 1].x1;
	const binsMaxLength = d3.max(bins, (d) => d.length);
	console.log("minEng:", minEng, "maxEng:", maxEng, "binsMaxLength:", binsMaxLength);

	xScale
		.domain([minEng, maxEng])
		.range([0, innerWidth]);
	yScale
		.domain([0, binsMaxLength])
		.range([innerHeight, 0])
		.nice();

	const svg = d3.select("#histogram")
		.append("svg")
		.attr("viewBox", `0 0 ${width} ${height}`)
		.style("border", "1px solid black");

	const innerChart = svg.append("g")
		.attr("transform", `translate(${margin.left}, ${margin.top})`);

	innerChart
		.selectAll("rect")
		.data(bins)
		.join("rect")
		.attr("x", (d) => xScale(d.x0))
		.attr("y", (d) => yScale(d.length))
		.attr("width", (d) => xScale(d.x1) - xScale(d.x0))
		.attr("height", (d) => innerHeight - yScale(d.length))
		.attr("fill", barColor)
		.attr("stroke", bodyBackgroundColor)
		.attr("stroke-width", 2);

	innerChart
		.append("g")
		.attr("transform", `translate(0, ${innerHeight})`)
		.call(d3.axisBottom(xScale));

	innerChart
		.append("g")
		.call(d3.axisLeft(yScale));

	innerChart
		.append("text")
		.attr("class", "axis-label")
		.attr("x", innerWidth / 2)
		.attr("y", innerHeight + margin.bottom - 8)
		.attr("text-anchor", "middle")
		.text("Energy Consumption");

	innerChart
		.append("text")
		.attr("class", "axis-label")
		.attr("transform", "rotate(-90)")
		.attr("x", -innerHeight / 2)
		.attr("y", -margin.left + 20)
		.attr("text-anchor", "middle")
		.text("Frequency");
};
