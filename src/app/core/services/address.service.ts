import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { AddressDto } from "../../shared/models/address.model";

@Injectable({providedIn: 'root'})
export class AddressSerice{
    private apiUrl = environment.apiUrl + 'address/';
    constructor(private http: HttpClient){}

    listAddressesByMember(idMember: Number): Observable<AddressDto[]>{
        return this.http.get<AddressDto[]>(`${this.apiUrl}get-address-by-idMember/${idMember}`);
    }
}