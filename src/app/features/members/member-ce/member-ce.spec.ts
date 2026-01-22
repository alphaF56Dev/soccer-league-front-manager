import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberCe } from './member-ce';

describe('MemberCe', () => {
  let component: MemberCe;
  let fixture: ComponentFixture<MemberCe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemberCe]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberCe);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
