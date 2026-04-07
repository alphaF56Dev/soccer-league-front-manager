import { Component, Input, OnInit } from '@angular/core';
import { PlayerCategoryService } from '../../../core/services/playercategory.service';
import { Observable } from 'rxjs';
import { PlayerCategoryDto } from '../../../shared/models/playercategory.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-teams-by-player',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './teams-by-player.html',
  styleUrl: './teams-by-player.css',
})
export class TeamsByPlayer implements OnInit{
  @Input() idMember!: string;
  $playerTeams!: Observable<PlayerCategoryDto[]>;

  constructor(
    private srvPlayerCat: PlayerCategoryService
  ){}

  ngOnInit(){
    this.loadTeamsByidMember(+this.idMember);
  }

  loadTeamsByidMember(idMember: Number){
    this.$playerTeams = this.srvPlayerCat.getTeamsByIdMember(idMember);
  }

  addNewTeam(idMember: number){
    console.log('Opening modal...');    
  }

  removeTeam(idPlayerCategory:number){
    console.log('Removing team from the member');    
  }
}
