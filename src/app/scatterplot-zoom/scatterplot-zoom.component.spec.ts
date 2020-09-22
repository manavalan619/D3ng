import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScatterplotZoomComponent } from './scatterplot-zoom.component';

describe('ScatterplotZoomComponent', () => {
  let component: ScatterplotZoomComponent;
  let fixture: ComponentFixture<ScatterplotZoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScatterplotZoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScatterplotZoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
