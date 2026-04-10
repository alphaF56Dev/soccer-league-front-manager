import { ChangeDetectorRef, Component, input, Input, OnInit } from '@angular/core';
import { PlayerCategoryService } from '../../../core/services/playercategory.service';
import { Observable } from 'rxjs';
import { PlayerCategoryDto } from '../../../shared/models/playercategory.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddTeamPlayer } from "./add-team-player/add-team-player";

@Component({
  selector: 'app-teams-by-player',
  imports: [
    CommonModule,
    FormsModule,
    AddTeamPlayer
],
  templateUrl: './teams-by-player.html',
  styleUrl: './teams-by-player.css',
})
export class TeamsByPlayer implements OnInit{
  @Input() idMember!: string;
  @Input() idPlayer!: string;
   $playerTeams!: Observable<PlayerCategoryDto[]>;
  showAddTeamModal = false;
  successMsg='';
  errorMsg='';

  constructor(
    private playerCatSrv: PlayerCategoryService,
    private cd: ChangeDetectorRef
  ){}

  ngOnInit(){
    this.loadTeamsByidMember(+this.idMember);
  }

  loadTeamsByidMember(idMember: Number){
    this.$playerTeams = this.playerCatSrv.getTeamsByIdMember(idMember);
  }

  addNewTeam(){
    this.showAddTeamModal = true;
  }

  removeTeam(idPlayerCategory:number){
    const confirmed = window.confirm('Are you sure you want do remove the team from this player?');
    if(!confirmed){
      return;
    }

    this.playerCatSrv.removeTeaamFromPlayer(idPlayerCategory).subscribe({
      next: () => {
        this.successMsg = 'Team removed successfully!';
        this.errorMsg = '';
        this.loadTeamsByidMember(+this.idMember); 
        this.cd.detectChanges();
      }, error: () => {
        this.errorMsg = 'Something was wrong trying to remove the team from the player, please contact your administrator!!!';
        this.cd.detectChanges();
      }
    });
  }

  closeAddTeamModal() {
    this.showAddTeamModal = false;
    this.loadTeamsByidMember(+this.idMember);
  }

  onTeamSaved() {
    this.closeAddTeamModal();
    this.loadTeamsByidMember(+this.idMember);
  }

}
