import { Component, inject, OnInit } from '@angular/core';
import { MenuButton } from "../common-components/menu-button/menu-button";
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { Team, TeamDto } from '../../shared/models/team.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TeamService } from '../../core/services/team.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teams',
  imports: [
    MenuButton,
    CommonModule,
    FormsModule
  ],
  templateUrl: './teams.html',
  styleUrl: './teams.css',
})
export class Teams implements OnInit{
  private route = inject(Router);
  teams$!: Observable<TeamDto[]>;
  filteredTeams$!: Observable<TeamDto[]>;
  filters = {
    name: new BehaviorSubject<string>(''),
    owner: new BehaviorSubject<string>(''),
    ownerEmail: new BehaviorSubject<string>(''),
    createdOn: new BehaviorSubject<string>('')
  }

  constructor(private teamSrv: TeamService){}
  
  ngOnInit(){
    this.getTeams();
    this.setupFilters();
  }

  getTeams(){
    this.teams$ = this.teamSrv.listTeams();
  }

  addTeam(){
    this.route.navigate(['/team-form']);  
  }

  modifyTeam(idTeam?: Number){
    this.route.navigate(['/edit-team/' + idTeam]);
  }

  private setupFilters(){
    this.filteredTeams$ = combineLatest([
      this.teams$,
      this.filters.name,
      this.filters.owner,
      this.filters.ownerEmail, 
      this.filters.createdOn
    ]).pipe(
      map(([teams, name, owner, ownerEmail, ceratedOn]) =>
        teams.filter(m => 
        (!name || m.name.toString().toLowerCase().includes(name.toLowerCase())) &&
        (!owner || m.memberName.toString().toLowerCase().includes(owner.toLowerCase())) &&
        (!ownerEmail || m.email.toString().toLowerCase().includes(ownerEmail.toLowerCase())) &&
        (!ceratedOn || m.registrationDate.toString().toLowerCase().includes(ceratedOn.toLowerCase()))
        )
      )
    )
  }
}
