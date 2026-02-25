import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { TeamCategoryDto } from "../../shared/models/team.model";

@Injectable({providedIn: 'root'})
export class TeamCategoryService{
    private urlApi = environment.apiUrl + 'team-category/';
    constructor(private http: HttpClient){}

    listCategoriesByIdTeam(idTeam: Number): Observable<TeamCategoryDto[]>{
        return this.http.get<TeamCategoryDto[]>(`${this.urlApi}get-categoriesId-byIdTeam/${idTeam}`);
    }

    addCateoryToTeam(idTeam: Number, idCategory: Number){
        return this.http.put(`${this.urlApi}add-category-to-team/${idTeam}/${idCategory}`, {});
    }

    removeCategoryOfTeam(idTeam: Number, idCategory: number){
        return this.http.put(`${this.urlApi}remove-category-from-team/${idTeam}/${idCategory}`, {});
    }
}