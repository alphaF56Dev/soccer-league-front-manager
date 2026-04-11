import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { PlayerCategoryDto } from '../../../shared/models/playercategory.model';
import { PlayerCategoryService } from '../../../core/services/playercategory.service';

@Component({
  selector: 'app-players-by-team',
  imports: [
    CommonModule,
    FormsModule
],
  templateUrl: './players-by-team.html',
  styleUrl: './players-by-team.css',
})
export class PlayersByTeam implements OnInit{
  @Input() idTeam!: string;
  players$!: Observable<PlayerCategoryDto[]>;
  filteredPlayers$!: Observable<PlayerCategoryDto[]>;

  private filterNickname$ = new BehaviorSubject<string>('');
  private filterCategory$ = new BehaviorSubject<string>('');
  private filterPlayerNumber$ = new BehaviorSubject<string>('');

  successMsg='';
  errorMsg='';

  constructor(
    private playerCatSrv: PlayerCategoryService,
    private cd: ChangeDetectorRef
  ){}

  ngOnInit() {
    this.loadPlayers(+this.idTeam);  
    this.applyFilters();  
  }

  loadPlayers(idTeam: number){
    this.players$ = this.playerCatSrv.getPlayersByIdTeam(idTeam);
  }

  applyFilters(){
    this.filteredPlayers$ = combineLatest([
      this.players$,
      this.filterNickname$,
      this.filterCategory$,
      this.filterPlayerNumber$
    ]).pipe(
      map(([players, nickname, category, number]) =>
        players.filter( p =>
        (nickname ? p.nickname.toLowerCase().includes(nickname.toLowerCase()) : true) && 
        (category ? p.categoryName.toLowerCase().includes(category.toLowerCase()) : true) && 
        (number ? p.player_number.toString().includes(number): true)
      )
    )
  )
  }

  setNicknameFilter(value: string){
    this.filterNickname$.next(value);
  }

  setCategoryFilter(value: string){
    this.filterCategory$.next(value);
  }

  setPlayerNumberFilter(value: string){
    this.filterPlayerNumber$.next(value);
  }

  removePlayer(idPlayerCategory: number){
    const confirmed = window.confirm(
      'Are you sure you want to remove the player from this team?'
    );
    if (!confirmed){
      return;
    }

    this.playerCatSrv.removeTeaamFromPlayer(idPlayerCategory).subscribe({
      next: () => {
        this.successMsg = 'Player was remove successfully!';
        this.errorMsg = ''; 
        this.loadPlayers(+this.idTeam);
        this.applyFilters();
        this.cd.detectChanges();
      }, error: (err) => {
        this.errorMsg = err.error;
        this.cd.detectChanges();
      }
    });
  }

  goToPlayer(idPlayer: number){

  }
}
