import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-scatterplot-zoom',
  templateUrl: './scatterplot-zoom.component.html',
  styleUrls: ['./scatterplot-zoom.component.scss'],
})
export class ScatterplotZoomComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    // this.createSVG();
  }

  private svg;
  private margin = 50;
  private width = 750 - this.margin * 2;
  private height = 400 - this.margin * 2;
  private k = 0.6289308176100629;
  private createSVG() {
    const svg = (this.svg = d3
      .select('figure#scatterplot')
      .append('svg')
      .attr('width', this.width + this.margin * 2)
      .attr('height', this.height + this.margin * 2));
      // .append('g')
      // .attr('transform', 'translate(' + this.margin + ',' + this.margin + ')'));
    d3.csv('/assets/scatterplot.csv').then((data) =>{
      console.log('-->',data)
      this.testDraw(data)
    } );
  }
  private testDraw(data: any): void {
    var zoom = d3.zoom().scaleExtent([0.5, 32]).on('zoom', zoomed);
    //x axis
    var x = d3.scaleLinear().domain([-4.5, 4.5]).range([0, this.width]);
    var y = d3
      .scaleLinear()
      .domain([-4.5 * this.k, 4.5 * this.k])
      .range([this.height, 0]);
    var z = d3
      .scaleOrdinal()
      .domain(data.map((d) => d[2]))
      .range(d3.schemeCategory10);

    var xAxis = (g, x) =>
      g
        .attr('transform', `translate(0,${this.height})`)
        .call(d3.axisTop(x).ticks(12))
        .call((g) => g.select('.domain').attr('display', 'none'));
    var yAxis = (g, y) =>
      g
        .call(d3.axisRight(y).ticks(12 * this.k))
        .call((g) => g.select('.domain').attr('display', 'none'));
    const gGrid = this.svg.append('g');

    const gDot = this.svg
      .append('g')
      .attr('fill', 'none')
      .attr('stroke-linecap', 'round');

    gDot
      .selectAll('path')
      .data(data)
      .join('path')
      .attr('d', (d) => `M${x(d[0])},${y(d[1])}h0`)
      .attr('stroke', (d) => z(d[2]));

    const gx = this.svg.append('g');

    const gy = this.svg.append('g');

    this.svg.call(zoom).call(zoom.transform, d3.zoomIdentity);

    function zoomed({ transform }) {
      const zx = transform.rescaleX(x).interpolate(d3.interpolateRound);
      const zy = transform.rescaleY(y).interpolate(d3.interpolateRound);
      gDot.attr('transform', transform).attr('stroke-width', 5 / transform.k);
      gx.call(this.xAxis, zx);
      gy.call(this.yAxis, zy);
      gGrid.call(this.grid, zx, zy);
    }
  }
}
