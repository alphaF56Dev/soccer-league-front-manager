import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesByTeam } from './categories-by-team';

describe('CategoriesByTeam', () => {
  let component: CategoriesByTeam;
  let fixture: ComponentFixture<CategoriesByTeam>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriesByTeam]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriesByTeam);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
