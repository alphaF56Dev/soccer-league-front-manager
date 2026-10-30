import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from '../../../core/services/category.service';
import { FieldCategoryService } from '../../../core/services/field-category.service';
import { Category } from '../../../shared/models/category.model';
import {
  FieldAvailabilityResultDto,
  FieldCategory,
} from '../../../shared/models/field-category.model';
import { finalize } from 'rxjs';

interface FieldCategoryDialogData {
  idField: number;
  idFieldCategory?: number | null;
}

interface MatchDayOption {
  value: number;
  label: string;
  selected: boolean;
}

@Component({
  selector: 'app-field-category-ce',
  imports: [CommonModule, FormsModule, MatDialogModule],
  templateUrl: './field-category-ce.html',
  styleUrl: './field-category-ce.css',
})
export class FieldCategoryCe implements OnInit, OnDestroy {
  readonly matchDays: MatchDayOption[] = [
    { value: 1, label: 'Monday', selected: false },
    { value: 2, label: 'Tuesday', selected: false },
    { value: 3, label: 'Wednesday', selected: false },
    { value: 4, label: 'Thursday', selected: false },
    { value: 5, label: 'Friday', selected: false },
    { value: 6, label: 'Saturday', selected: false },
    { value: 7, label: 'Sunday', selected: false },
  ];

  categories: Category[] = [];
  fieldCategory: FieldCategory = {
    idField: { idField: 0 },
    idCategoryLeague: { idCategoryLeague: 0 },
    startHour: '',
    endHour: '',
    matchDays: '',
    isActive: true,
  };
  selectedCategoryId = 0;
  isEdit = false;
  isLoading = false;
  isSaving = false;
  successMsg = '';
  errorMsg = '';
  fieldsOverSlap: string[] = [];
  private closeTimer?: ReturnType<typeof setTimeout>;

  constructor(
    private categorySrv: CategoryService,
    private fieldCategorySrv: FieldCategoryService,
    public dialogRef: MatDialogRef<FieldCategoryCe>,
    @Inject(MAT_DIALOG_DATA) public data: FieldCategoryDialogData,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.isEdit = !!this.data.idFieldCategory;
    this.fieldCategory.idField.idField = this.data.idField;
    this.loadCategories();

    if (this.data.idFieldCategory) {
      this.loadFieldCategory(this.data.idFieldCategory);
    }
  }

  ngOnDestroy(): void {
    if (this.closeTimer) {
      clearTimeout(this.closeTimer);
    }
  }

  get hasSelectedMatchDay(): boolean {
    return this.matchDays.some((day) => day.selected);
  }

  saveFieldCategory(): void {
    this.errorMsg = '';
    this.fieldsOverSlap = [];
    this.isSaving = true;
    this.fieldCategory.idField.idField = this.data.idField;
    this.fieldCategory.idCategoryLeague.idCategoryLeague = this.selectedCategoryId;
    this.fieldCategory.matchDays = this.matchDays
      .filter((day) => day.selected)
      .map((day) => day.value)
      .join('');
    this.fieldCategory.startHour = this.formatHour(this.fieldCategory.startHour);
    this.fieldCategory.endHour = this.formatHour(this.fieldCategory.endHour);

    this.fieldCategorySrv
      .saveFieldCategory(this.fieldCategory)
      .pipe(finalize(() => (this.isSaving = false)))
      .subscribe({
        next: (response) => {
          if (response.status !== 200) {
            this.errorMsg = response.body?.message || 'Unable to save the field category.';
            this.cd.markForCheck();
            return;
          }

          this.successMsg = response.body?.message || 'Field category saved successfully.';
          this.closeTimer = setTimeout(() => this.dialogRef.close(true), 5000);
          this.cd.markForCheck();
        },
        error: (error: unknown) => this.handleSaveError(error),
      });
  }

  cancel(): void {
    this.dialogRef.close();
  }

  private loadCategories(): void {
    this.categorySrv.listCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
        this.cd.markForCheck();
      },
      error: () => {
        this.errorMsg = 'Unable to load categories. Please contact your support.';
        this.cd.markForCheck();
      },
    });
  }

  private loadFieldCategory(idFieldCategory: number): void {
    this.isLoading = true;
    this.fieldCategorySrv
      .getFieldCategoryById(idFieldCategory)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (fieldCategory) => {
          this.fieldCategory = {
            ...fieldCategory,
            startHour: this.formatHour(fieldCategory.startHour),
            endHour: this.formatHour(fieldCategory.endHour),
          };
          this.selectedCategoryId =
            fieldCategory.idCategoryLeague.idCategoryLeague ?? 0;
          const selectedDays = new Set(fieldCategory.matchDays);
          this.matchDays.forEach((day) => {
            day.selected = selectedDays.has(String(day.value));
          });
          this.cd.markForCheck();
        },
        error: () => {
          this.errorMsg = 'Unable to load the field category. Please contact your support.';
          this.cd.markForCheck();
        },
      });
  }

  private formatHour(value: string): string {
    return value.slice(0, 5);
  }

  private handleSaveError(error: unknown): void {
    this.fieldsOverSlap = [];
    if (error instanceof HttpErrorResponse) {
      const result = this.toAvailabilityResult(error.error);
      if (error.status === 500 && result?.code === 2) {
        this.errorMsg = result.message || 'The selected schedule overlaps with another field.';
        this.fieldsOverSlap = result.fieldsOverSlap ?? [];
        this.cd.markForCheck();
        return;
      }

      this.errorMsg = result?.message || 'Unable to save the field category. Please try again.';
    } else {
      this.errorMsg = 'Unable to save the field category. Please try again.';
    }
    this.cd.markForCheck();
  }

  private toAvailabilityResult(value: unknown): Partial<FieldAvailabilityResultDto> | null {
    if (!value || typeof value !== 'object') {
      return null;
    }

    const result = value as Partial<FieldAvailabilityResultDto>;
    return {
      code: result.code,
      message: result.message,
      fieldsOverSlap: Array.isArray(result.fieldsOverSlap) ? result.fieldsOverSlap : [],
    };
  }
}
