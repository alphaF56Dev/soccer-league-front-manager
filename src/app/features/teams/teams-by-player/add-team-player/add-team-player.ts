import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, input, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Category } from '../../../../shared/models/category.model';
import { PlayerCategoryService } from '../../../../core/services/playercategory.service';
import { CategoryService } from '../../../../core/services/category.service';
import { TeamCategoryService } from '../../../../core/services/team-category.service';
import { TeamCategoryLeague } from '../../../../shared/models/team-category.model';
import { Player } from '../../../../shared/models/player.model';

@Component({
  selector: 'app-add-team-player',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './add-team-player.html',
  styleUrl: './add-team-player.css',
})
export class AddTeamPlayer implements OnInit{
  @Input() idMember!: string;
  @Input() idPlayer!: string;
  @Output() saved = new EventEmitter<void>();
  @Output() closed = new EventEmitter<void>();

  $categories!: Observable<Category[]>;
  $teams!: Observable<TeamCategoryLeague[]>;
  selectedCategoryId: number = 0;
  selectedTeamId: number = 0;
  playerNumber: number = 0;
  player: Player = {} as Player;
  errorMsg = '';
  successMsg = '';

  constructor(
    private playerCatSrv: PlayerCategoryService,
    private categorySrv: CategoryService,
    private teamCatSrv: TeamCategoryService,
    private cd: ChangeDetectorRef
  ){}

  ngOnInit(){
    this.loadCategoriesAvailables(+this.idMember);
  }

  loadCategoriesAvailables(idMember: Number){
    this.$categories = this.categorySrv.getCategoriesAvailablesByMemberId(idMember);
  }

  closeModal(){
    console.log('closing form');
    this.closed.emit();
  }

  loadTeamsByCategory(selectedCategoryId: Number){
    this.$teams = this.teamCatSrv.listTeamsByCategory(selectedCategoryId);
  }

  save(){
    let playerCat : any = {
      "idPlayer": +this.idPlayer,
      "idTeam": +this.selectedTeamId,
      "idCategoryLeague": +this.selectedCategoryId,
      "player_number": "" + this.playerNumber
    }
    
    this.playerCatSrv.saveTeamToPlayer(playerCat).subscribe({
      next: (res) => {
        this.successMsg = res;
        this.errorMsg = '';
        this.cd.detectChanges();
        setTimeout(() => {
          this.closeModal();
        }, 3000);
      }, error: (err) => {
        this.errorMsg = err.error;
        this.cd.detectChanges();
      }
    }); 
  }
}
