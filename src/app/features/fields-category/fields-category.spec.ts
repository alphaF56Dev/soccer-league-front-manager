import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { FieldCategoryService } from '../../core/services/field-category.service';
import { FieldsCategory } from './fields-category';

describe('FieldsCategory', () => {
  let component: FieldsCategory;
  let fixture: ComponentFixture<FieldsCategory>;
  let fieldCategoryService: { listCategoriesByIdField: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    fieldCategoryService = {
      listCategoriesByIdField: vi.fn().mockReturnValue(of([])),
    };

    await TestBed.configureTestingModule({
      imports: [FieldsCategory],
      providers: [{ provide: FieldCategoryService, useValue: fieldCategoryService }],
    }).compileComponents();

    fixture = TestBed.createComponent(FieldsCategory);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load categories when a field id is provided', () => {
    fixture.componentRef.setInput('idField', 12);
    fixture.detectChanges();

    expect(fieldCategoryService.listCategoriesByIdField).toHaveBeenCalledWith(12);
  });
});
