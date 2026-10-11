const populateFilters = (data) => {
	const updateHistogram = (filterId, chartData) => {
		const updatedData = filterId === "all"
			? chartData
			: chartData.filter((tv) => tv.screenTech === filterId);
		const updatedBins = binGenerator(updatedData);

		d3.select("#histogram svg g")
			.selectAll("rect")
			.data(updatedBins)
			.join(
				(enter) => enter.append("rect")
					.attr("y", innerHeight)
					.attr("height", 0),
				(update) => update,
				(exit) => exit.remove()
			)
			.transition()
			.duration(500)
			.ease(d3.easeCubicInOut)
			.attr("x", (d) => xScale(d.x0))
			.attr("y", (d) => yScale(d.length))
			.attr("width", (d) => xScale(d.x1) - xScale(d.x0))
			.attr("height", (d) => innerHeight - yScale(d.length));
	};

	d3.select("#filters_screen")
		.selectAll(".filter")
		.data(filters_screen)
		.join("button")
		.attr("type", "button")
		.attr("class", (d) => `filter ${d.isActive ? "active" : ""}`)
		.attr("aria-pressed", (d) => d.isActive)
		.text((d) => d.label)
		.on("click", (event, d) => {
			if (!d.isActive) {
				filters_screen.forEach((filter) => {
					filter.isActive = d.id === filter.id;
				});

				d3.selectAll("#filters_screen .filter")
					.classed("active", (filter) => filter.id === d.id)
					.attr("aria-pressed", (filter) => filter.id === d.id);
			}

			updateHistogram(d.id, data);
			console.log("Clicked filter:", event);
			console.log("Clicked filter data:", d);
		});
};

const createTooltip = () => {};

const handleMouseEvents = () => {};
