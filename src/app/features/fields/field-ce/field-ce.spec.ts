import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldCe } from './field-ce';

describe('FieldCe', () => {
  let component: FieldCe;
  let fixture: ComponentFixture<FieldCe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FieldCe]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FieldCe);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
