import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerCe } from './player-ce';

describe('PlayerCe', () => {
  let component: PlayerCe;
  let fixture: ComponentFixture<PlayerCe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerCe]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerCe);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
