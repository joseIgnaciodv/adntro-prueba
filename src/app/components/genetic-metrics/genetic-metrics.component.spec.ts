import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneticMetricsComponent } from './genetic-metrics.component';

describe('GeneticMetricsComponent', () => {
  let component: GeneticMetricsComponent;
  let fixture: ComponentFixture<GeneticMetricsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GeneticMetricsComponent]
    });
    fixture = TestBed.createComponent(GeneticMetricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
