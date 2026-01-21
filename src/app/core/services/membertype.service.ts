import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { MemberType } from "../../shared/models/membertype.model";

@Injectable({providedIn: 'root'})
export class MemberTypeService{
    private apiUrl = environment.apiUrl + 'member-type/';
    constructor(private http: HttpClient){}

    listMembersType(): Observable<MemberType[]>{
        return this.http.get<MemberType[]>(`${this.apiUrl}list-membertypes`);
    }

    saveMemberType(memberType: MemberType): Observable<any>{
        return this.http.post(`${this.apiUrl}save-membertype`, memberType);
    }

    getMemberTypeById(idMemberType: Number): Observable<MemberType>{
        return this.http.get<MemberType>(`${this.apiUrl}get-membertype-by-id/${idMemberType}`);
    }
}