import { Component, input, Input, OnInit } from '@angular/core';
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

  constructor(
    private srvPlayerCat: PlayerCategoryService
  ){}

  ngOnInit(){
    this.loadTeamsByidMember(+this.idMember);
  }

  loadTeamsByidMember(idMember: Number){
    this.$playerTeams = this.srvPlayerCat.getTeamsByIdMember(idMember);
  }

  addNewTeam(){
    this.showAddTeamModal = true;
  }

  removeTeam(idPlayerCategory:number){
    console.log('Removing team from the member');    
  }

  closeAddTeamModal() {
    this.showAddTeamModal = false;
  }

  onTeamSaved() {
    this.closeAddTeamModal();
    this.loadTeamsByidMember(+this.idMember);
  }

}
