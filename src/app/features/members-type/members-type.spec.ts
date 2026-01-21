import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersType } from './members-type';

describe('MembersType', () => {
  let component: MembersType;
  let fixture: ComponentFixture<MembersType>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MembersType]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MembersType);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
