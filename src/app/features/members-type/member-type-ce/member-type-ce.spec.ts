import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberTypeCe } from './member-type-ce';

describe('MemberTypeCe', () => {
  let component: MemberTypeCe;
  let fixture: ComponentFixture<MemberTypeCe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemberTypeCe]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberTypeCe);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
