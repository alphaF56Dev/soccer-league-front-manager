import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamCe } from './team-ce';

describe('TeamCe', () => {
  let component: TeamCe;
  let fixture: ComponentFixture<TeamCe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamCe]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamCe);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
