import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Address, AddressDto } from "../../shared/models/address.model";

@Injectable({providedIn: 'root'})
export class AddressService{
    private apiUrl = environment.apiUrl + 'address/';
    constructor(private http: HttpClient){}

    listAddressesByMember(idMember: Number): Observable<AddressDto[]>{
        return this.http.get<AddressDto[]>(`${this.apiUrl}get-address-by-idMember/${idMember}`);
    }

    saveAddress(address: Address): Observable<any>{
        return this.http.post(`${this.apiUrl}save-address`, address );
    }

    getAddressById(idAddress: Number) : Observable<Address>{
        return this.http.get<Address>(`${this.apiUrl}get-address-byid/${idAddress}`);
    }
}