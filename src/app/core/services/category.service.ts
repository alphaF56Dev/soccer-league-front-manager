import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Category } from "../../shared/models/category.model";

@Injectable({providedIn: 'root'})
export class CategoryService{
    private urlApi = environment.apiUrl + 'category-league/';
    constructor(private http: HttpClient){}

    listCategories(): Observable<Category[]>{
        return this.http.get<Category[]>(`${this.urlApi}list-categoryLeague`);
    }

    saveCategory(category: Category): Observable<Category>{
        return this.http.post<Category>(`${this.urlApi}save-categoryLeague`, category);
    }

    getCategoryById(categoryId: Number): Observable<Category>{
        return this.http.get<Category>(`${this.urlApi}get-categoryLeagueById/${categoryId}`);
    }
}