/*
*    main.js
*    My First Chart
*    datackling.com
*/

const WIDTH = 580
const HEIGHT = 340

const svg = d3.select("#chart-area")
    .append("svg")
    .attr("width", 600)
    .attr("height", 400)

const g = svg.append("g")
    .attr("transform", `translate(100, 30)`)

// X label
g.append("text")
  .attr("class", "x axis-label")
  .attr("x", WIDTH / 2)
  .attr("y", HEIGHT + 50)
  .attr("font-size", "20px")
  .attr("text-anchor", "middle")
  .text("Year")

// Y label
g.append("text")
  .attr("class", "y axis-label")
  .attr("x", - (HEIGHT / 2))
  .attr("y", -60)
  .attr("font-size", "20px")
  .attr("text-anchor", "middle")
  .attr("transform", "rotate(-90)")
  .text("Revenue")

// Title
g.append("text")
  .attr("class", "y axis-label")
  .attr("x", (WIDTH/2.5 ))
  .attr("y", 0)
  .attr("font-size", "20px")
  .attr("text-anchor", "middle")
  .text("Revenue per year of your business")

d3.csv("revenues.csv").then(data => {
    // Scaling the y axis
    const y = d3.scaleLinear()
       .domain([0, d3.max(data, d => d.revenue)])    // input
       .range([340, 0])  // output

    // Scaling the x axis
    const x = d3.scaleBand()
        .domain(data.map(d => d.year))    // input
        .range([0, 480])
        .paddingInner(0.5)
        .paddingOuter(0.2)// ouput

    const xAxisCall = d3.axisBottom(x)
    g.append("g")
        .attr("class", "x axis")
        .attr("transform", `translate(0, 340)`)
        .call(xAxisCall)
        .selectAll("text")
        .attr("y", "10")
        .attr("x", "-5")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-40)")

    const yAxisCall = d3.axisLeft(y)
    .ticks(3)
    .tickFormat(d => "$"+d)
    g.append("g")
      .attr("class", "y axis")
      .call(yAxisCall)


    const rects = g.selectAll("rect")
        .data(data)

    rects.enter().append("rect")
        .attr("y", d => y(d.revenue))
        .attr("x", d => x(d.year))
        .attr("width", x.bandwidth)
        .attr("height", d => 340 - y(d.revenue))
        .attr("fill", "#6a976a")
})