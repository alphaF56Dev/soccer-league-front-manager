import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FieldCategoryService } from '../../core/services/field-category.service';
import { FieldCategoryDto } from '../../shared/models/field-category.model';

@Component({
  selector: 'app-fields-category',
  imports: [CommonModule],
  templateUrl: './fields-category.html',
  styleUrl: './fields-category.css',
})
export class FieldsCategory implements OnChanges {
  @Input() idField = 0;

  fieldCategories: FieldCategoryDto[] = [];
  errorMsg = '';
  isLoading = false;

  constructor(
    private fieldCategorySrv: FieldCategoryService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['idField'] && this.idField > 0) {
      this.getFieldCategories(this.idField);
    }
  }

  private getFieldCategories(idField: number): void {
    this.isLoading = true;
    this.errorMsg = '';
    this.fieldCategorySrv.listCategoriesByIdField(idField).subscribe({
      next: (res) => {
        this.fieldCategories = res;
        this.isLoading = false;
        this.cd.markForCheck();
      },
      error: () => {
        this.fieldCategories = [];
        this.isLoading = false;
        this.errorMsg = 'Unable to load field categories. Please contact your support.';
        this.cd.markForCheck();
      },
    });
  }
}
