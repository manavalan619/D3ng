import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoomAxisComponent } from './zoom-axis.component';

describe('ZoomAxisComponent', () => {
  let component: ZoomAxisComponent;
  let fixture: ComponentFixture<ZoomAxisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZoomAxisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoomAxisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
