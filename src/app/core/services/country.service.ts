import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Country } from "../../shared/models/country.model";

@Injectable({providedIn: 'root'})
export class CountryService{
    private apiUrl = environment.apiUrl;
    constructor (private http: HttpClient){}

    listCountries(): Observable<Country[]>{
        return this.http.get<Country[]>(`${this.apiUrl}countries/list-countries`);
    }

    saveCountry(country: Country):  Observable<any>{
        return this.http.post(`${this.apiUrl}countries/save-country`, country);
    }
}