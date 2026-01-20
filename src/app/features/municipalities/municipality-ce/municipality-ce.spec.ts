import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MunicipalityCe } from './municipality-ce';

describe('MunicipalityCe', () => {
  let component: MunicipalityCe;
  let fixture: ComponentFixture<MunicipalityCe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MunicipalityCe]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MunicipalityCe);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
