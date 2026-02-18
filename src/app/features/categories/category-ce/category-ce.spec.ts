import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryCe } from './category-ce';

describe('CategoryCe', () => {
  let component: CategoryCe;
  let fixture: ComponentFixture<CategoryCe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryCe]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryCe);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
