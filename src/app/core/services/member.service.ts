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

    saveMember(member: Member) : Observable<any>{
        return this.http.post(`${this.urlApi}save-member`, member);
    }

    getMemberById(idMember: Number): Observable<any>{
        return this.http.get<any>(`${this.urlApi}get-member-by-id/${idMember}`);
    }
}