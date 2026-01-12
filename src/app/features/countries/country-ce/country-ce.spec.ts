import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryCe } from './country-ce';

describe('CountryCe', () => {
  let component: CountryCe;
  let fixture: ComponentFixture<CountryCe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountryCe]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountryCe);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
