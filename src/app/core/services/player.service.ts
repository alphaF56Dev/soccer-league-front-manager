import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Player, PlayerDto } from "../../shared/models/player.model";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class PlayerService{
    private apiUrl = environment.apiUrl + 'player/';
    constructor(private http: HttpClient){}

    savePlayer(player: Player): Observable<Player>{
        return this.http.post<Player>(`${this.apiUrl}save-player`, player);
    }

    getPlayerByIdMember(idMember: number): Observable<Player>{
        return this.http.get<Player>(`${this.apiUrl}get-player-by-idmember/${idMember}`);
    }
}