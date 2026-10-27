import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { FieldCategoryDto } from '../../shared/models/field-category.model';

@Injectable({ providedIn: 'root' })
export class FieldCategoryService {
  private urlApi = environment.apiUrl + 'field-category/';

  constructor(private http: HttpClient) {}

  listCategoriesByIdField(idField: number): Observable<FieldCategoryDto[]> {
    return this.http.get<FieldCategoryDto[]>(
      `${this.urlApi}list-categories-by-id-field/${idField}`
    );
  }
}
