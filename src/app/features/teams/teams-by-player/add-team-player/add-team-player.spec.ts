import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTeamPlayer } from './add-team-player';

describe('AddTeamPlayer', () => {
  let component: AddTeamPlayer;
  let fixture: ComponentFixture<AddTeamPlayer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTeamPlayer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTeamPlayer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
