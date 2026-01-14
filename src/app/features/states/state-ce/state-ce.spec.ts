import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateCe } from './state-ce';

describe('StateCe', () => {
  let component: StateCe;
  let fixture: ComponentFixture<StateCe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StateCe]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StateCe);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
