import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BarComponent } from './bar/bar.component';
import { PieComponent } from './pie/pie.component';
import { ScatterComponent } from './scatter/scatter.component';
import { ZoomAxisComponent } from './zoom-axis/zoom-axis.component';
import { BubbleChartComponent } from './bubble-chart/bubble-chart.component';
import { ScatterplotZoomComponent } from './scatterplot-zoom/scatterplot-zoom.component';

@NgModule({
  declarations: [
    AppComponent,
    BarComponent,
    PieComponent,
    ScatterComponent,
    ZoomAxisComponent,
    BubbleChartComponent,
    ScatterplotZoomComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
