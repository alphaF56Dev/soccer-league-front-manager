import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { UserAccess } from "../../shared/models/user_access.model";

@Injectable({providedIn: 'root'})
export class LoginService{
    private apiUrl = environment.apiUrl;
    constructor (private http: HttpClient){}

    auth(userAccess:UserAccess){
        return this.http.post(`${this.apiUrl}users/auth`, userAccess);
    }

}