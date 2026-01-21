import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Member } from "../../shared/models/member.model";

@Injectable({providedIn: 'root'})
export class MemberService{
    private urlApi = environment.apiUrl + 'member/';
    constructor(private http: HttpClient){}

    listMembers(): Observable<Member[]>{
        return this.http.get<Member[]>(`${this.urlApi}list-members`);
    }
}