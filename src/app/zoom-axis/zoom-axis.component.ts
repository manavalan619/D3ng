import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-zoom-axis',
  templateUrl: './zoom-axis.component.html',
  styleUrls: ['./zoom-axis.component.scss'],
})
export class ZoomAxisComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.createSvg();
  }

  private SVG;
  // set the dimensions and margins of the graph
  private margin = { top: 10, right: 30, bottom: 30, left: 60 };
  width = 750 - this.margin.left - this.margin.right;
  height = 500 - this.margin.top - this.margin.bottom;
  private createSvg(): void {
    // append the SVG object to the body of the page
    this.SVG = d3
      .select('#dataviz_axisZoom')
      .append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append('g')
      .attr(
        'transform',
        'translate(' + this.margin.left + ',' + this.margin.top + ')'
      );
    d3.csv('/assets/testData.csv').then((data) => this.testDraw(data));
  }

  //Read the data

  private testDraw(data: any[]): void {
    // Add X axis
    var x = d3.scaleLinear().domain([4, 8]).range([0, this.width]);
    var xAxis = this.SVG.append('g')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3.scaleLinear().domain([0, 9]).range([this.height, 0]);
    var yAxis = this.SVG.append('g').call(d3.axisLeft(y));

    // Add a clipPath: everything out of this area won't be drawn.
    var clip = this.SVG.append('defs')
      .append('SVG:clipPath')
      .attr('id', 'clip')
      .append('SVG:rect')
      .attr('width', this.width)
      .attr('height', this.height)
      .attr('x', 0)
      .attr('y', 0);

    // Create the scatter variable: where both the circles and the brush take place
    var scatter = this.SVG.append('g').attr('clip-path', 'url(#clip)');

    // Add circles
    scatter
      .selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', function (d) {
        return x(d['Sepal_Length']);
      })
      .attr('cy', function (d) {
        return y(d['Petal_Length']);
      })
      .attr('r', 8)
      .style('fill', '#9c288e')
      .style('opacity', 0.5);

    // Set the zoom and Pan features: how much you can zoom, on which part, and what to do when there is a zoom
    var zoom = d3
      .zoom()
      .scaleExtent([0.5, 20]) // This control how much you can unzoom (x0.5) and zoom (x20)
      .extent([
        [0, 0],
        [this.width, this.height],
      ])
      .on('zoom', updateChart);

    // This add an invisible rect on top of the chart area. This rect can recover pointer events: necessary to understand when the user zoom
    this.SVG.append('rect')
      .attr('width', this.width)
      .attr('height', this.height)
      .style('fill', 'none')
      .style('pointer-events', 'all')
      .attr(
        'transform',
        'translate(' + this.margin.left + ',' + this.margin.top + ')'
      )
      .call(zoom);
    // now the user can zoom and it will trigger the function called updateChart

    // A function that updates the chart when the user zoom and thus new boundaries are available
    function updateChart() {
      // recover the new scale
      var newX = d3.event.transform.rescaleX(x);
      var newY = d3.event.transform.rescaleY(y);

      // update axes with these new boundaries
      xAxis.call(d3.axisBottom(newX));
      yAxis.call(d3.axisLeft(newY));

      // update circle position
      scatter
        .selectAll('circle')
        .attr('cx', function (d) {
          return newX(d['Sepal_Length']);
        })
        .attr('cy', function (d) {
          return newY(d['Petal_Length']);
        });
    }
  }
}
