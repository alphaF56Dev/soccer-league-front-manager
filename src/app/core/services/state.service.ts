import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { State } from "../../shared/models/state.model";

@Injectable({providedIn: 'root'})
export class StateService {
    private apiUrl = environment.apiUrl+'state/';
    constructor(private http: HttpClient){}

    listStates(): Observable<State[]>{        
        return this.http.get<State[]>(`${this.apiUrl}list-states`);
    }

    saveState(state: State): Observable<any>{
        return this.http.post(`${this.apiUrl}save-state`, state);
    }

    getStateById(state_id: Number): Observable<State>{
        return this.http.get<State>(`${this.apiUrl}get-state-byId/${state_id}`);
    }
}