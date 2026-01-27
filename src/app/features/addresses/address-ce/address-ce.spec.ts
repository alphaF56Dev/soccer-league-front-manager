import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressCe } from './address-ce';

describe('AddressCe', () => {
  let component: AddressCe;
  let fixture: ComponentFixture<AddressCe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddressCe]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddressCe);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
