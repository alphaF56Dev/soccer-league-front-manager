import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { FieldCategoryService } from '../../core/services/field-category.service';
import { FieldsCategory } from './fields-category';

describe('FieldsCategory', () => {
  let component: FieldsCategory;
  let fixture: ComponentFixture<FieldsCategory>;
  let fieldCategoryService: { listCategoriesByIdField: ReturnType<typeof vi.fn> };
  let dialog: { open: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    fieldCategoryService = {
      listCategoriesByIdField: vi.fn().mockReturnValue(of([])),
    };
    dialog = {
      open: vi.fn().mockReturnValue({ afterClosed: () => of(false) }),
    };

    await TestBed.configureTestingModule({
      imports: [FieldsCategory],
      providers: [
        { provide: FieldCategoryService, useValue: fieldCategoryService },
        { provide: MatDialog, useValue: dialog },
      ],
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

  it('should open the field-category dialog with the selected field and category ids', () => {
    fixture.componentRef.setInput('idField', 12);

    component.openFieldCategoryForm(34);

    expect(dialog.open).toHaveBeenCalledWith(
      expect.any(Function),
      expect.objectContaining({ data: { idField: 12, idFieldCategory: 34 } })
    );
  });
});
