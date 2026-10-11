const populateFilters = (data) => {
	const updateHistogram = (filterId, chartData) => {
		const updatedData = filterId === "all"
			? chartData
			: chartData.filter((tv) => tv.screenTech === filterId);
		const updatedBins = binGenerator(updatedData);

		d3.select("#histogram svg g")
			.selectAll(".histogram-bar")
			.data(updatedBins)
			.join(
				(enter) => enter.append("rect")
					.attr("class", "histogram-bar")
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

	const updateScatterplot = (filterId, chartData) => {
		const updatedData = filterId === "all"
			? chartData
			: chartData.filter((tv) => tv.screenTech === filterId);

		innerChartS
			.selectAll("circle")
			.data(updatedData)
			.join(
				(enter) => enter.append("circle")
					.attr("r", 0),
				(update) => update,
				(exit) => exit.remove()
			)
			.transition()
			.duration(500)
			.ease(d3.easeCubicInOut)
			.attr("r", 3)
			.attr("cx", (d) => xScaleS(d.star))
			.attr("cy", (d) => yScaleS(d.energyConsumption))
			.attr("fill", (d) => colorScale(d.screenTech))
			.attr("opacity", 0.5);

		handleMouseEvents();
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
			updateScatterplot(d.id, data);
			console.log("Clicked filter:", event);
			console.log("Clicked filter data:", d);
		});
};

const createTooltip = (data) => {
	const tooltip = innerChartS.append("g")
		.attr("class", "tooltip")
		.style("opacity", 0)
		.style("pointer-events", "none");

	tooltip.append("rect")
		.attr("width", tooltipWidth)
		.attr("height", tooltipHeight)
		.attr("rx", 3)
		.attr("ry", 3)
		.attr("fill", barColor)
		.attr("fill-opacity", 0.75);

	tooltip.append("text")
		.attr("fill", "white")
		.style("font-size", "10px")
		.style("font-weight", 700);

	const histogramTooltip = d3.select("#histogram svg g")
		.append("g")
		.attr("class", "histogram-tooltip")
		.style("opacity", 0)
		.style("pointer-events", "none");

	histogramTooltip.append("rect")
		.attr("width", tooltipWidth)
		.attr("height", tooltipHeight)
		.attr("rx", 3)
		.attr("ry", 3)
		.attr("fill", barColor)
		.attr("fill-opacity", 0.85);

	histogramTooltip.append("text")
		.attr("fill", "white")
		.attr("x", 8)
		.attr("y", 18)
		.style("font-size", "11px")
		.style("font-weight", 700);
};

const handleMouseEvents = () => {
	innerChartS.selectAll("circle")
		.on("mouseenter", (event, d) => {
			d3.select(".tooltip text")
				.selectAll("tspan")
				.data([`Brand: ${d.brand}`, `Model: ${d.model}`, `Screen size: ${d.screenSize}"`])
				.join("tspan")
				.attr("x", 8)
				.attr("y", (line, i) => 15 + i * 17)
				.text((line) => line);

			const cx = Number(event.target.getAttribute("cx"));
			const cy = Number(event.target.getAttribute("cy"));
			const tooltipX = Math.max(0, Math.min(innerWidth - tooltipWidth, cx - tooltipWidth / 2));
			const tooltipY = Math.max(0, cy - tooltipHeight - 6);

			d3.select(".tooltip")
				.interrupt()
				.attr("transform", `translate(${tooltipX}, ${tooltipY})`)
				.transition()
				.duration(200)
				.style("opacity", 1);
		})
		.on("mouseleave", () => {
			d3.select(".tooltip")
				.interrupt()
				.style("opacity", 0)
				.attr("transform", `translate(0, ${innerHeight + tooltipHeight})`);
		});

	d3.select("#histogram").selectAll(".histogram-bar")
		.on("mouseenter", (event, bin) => {
			const tooltipText = d3.select(".histogram-tooltip text");
			tooltipText.selectAll("tspan")
				.data([
					`TVs: ${bin.length}`,
					`Energy: ${bin.x0}–${bin.x1}`
				])
				.join("tspan")
				.attr("x", 8)
				.attr("dy", (line, i) => i === 0 ? 0 : 18)
				.text((line) => line);

			const barX = Number(event.target.getAttribute("x"));
			const barY = Number(event.target.getAttribute("y"));
			const barWidth = Number(event.target.getAttribute("width"));
			const tooltipX = Math.max(0, Math.min(innerWidth - tooltipWidth, barX + barWidth / 2 - tooltipWidth / 2));
			const tooltipY = Math.max(0, barY - tooltipHeight - 6);

			d3.select(".histogram-tooltip")
				.attr("transform", `translate(${tooltipX}, ${tooltipY})`)
				.interrupt()
				.transition()
				.duration(180)
				.style("opacity", 1);
		})
		.on("mouseleave", () => {
			d3.select(".histogram-tooltip")
				.interrupt()
				.transition()
				.duration(120)
				.style("opacity", 0);
		});
};
