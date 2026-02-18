import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionCe } from './position-ce';

describe('PositionCe', () => {
  let component: PositionCe;
  let fixture: ComponentFixture<PositionCe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PositionCe]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PositionCe);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
