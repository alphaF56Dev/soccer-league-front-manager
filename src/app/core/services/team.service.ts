import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Team, TeamDto } from "../../shared/models/team.model";

@Injectable({providedIn: 'root'})
export class TeamService{
    private apiUrl = environment.apiUrl + 'team/';

    constructor(private http: HttpClient){}

    listTeams(): Observable<TeamDto[]>{
        return this.http.get<TeamDto[]>(`${this.apiUrl}list-teams`);
    }
}