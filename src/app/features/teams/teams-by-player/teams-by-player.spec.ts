import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsByPlayer } from './teams-by-player';

describe('TeamsByPlayer', () => {
  let component: TeamsByPlayer;
  let fixture: ComponentFixture<TeamsByPlayer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamsByPlayer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamsByPlayer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
