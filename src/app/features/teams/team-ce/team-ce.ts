import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { Team } from '../../../shared/models/team.model';
import { Member } from '../../../shared/models/member.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from "@angular/material/tabs";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { TeamService } from '../../../core/services/team.service';
import { MemberService } from '../../../core/services/member.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NavButton } from "../../common-components/nav-button/nav-button";
import { MemberInfo } from "../../members/member-info/member-info";
import { CategoriesByTeam } from "../../categories/categories-by-team/categories-by-team";

@Component({
  selector: 'app-team-ce',
  imports: [
    CommonModule,
    FormsModule,
    MatTabsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatOptionModule,
    NavButton,
    MemberInfo,
    CategoriesByTeam
],
  templateUrl: './team-ce.html',
  styleUrl: './team-ce.css',
})
export class TeamCe implements OnInit{
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  team: Team = {
    isActive: true,
    member: {} as Member,
    name: '',
    registrationDate: '',
  };
  isEdit = false;
  successMsg = '';
  errorMsg = '';
  isNew = false;

  members$!: Observable<Member[]>;
  filteredMembers$!: Observable<Member[]>;
  memberFilter$ = new BehaviorSubject<string>('');

  constructor(
    private teamSrv: TeamService,
    private memberSrv: MemberService,
    private cd: ChangeDetectorRef
  ){}

  ngOnInit() {
    this.getMembers();
    this.setupFilter();    
  }

  ngAfterViewInit(){
    const id = this.route.snapshot.paramMap.get('idTeam');
    if(id){
      this.getTeam(+id);
      this.isEdit = true;
      this.cd.detectChanges();
    }    
  }

  saveTeam(){
    this.errorMsg = '';
    this.isNew = this.team.idTeam ? false : true;
    this.teamSrv.saveTeam(this.team).subscribe({
      next: (res) => {
        this.team = {... res};
        this.successMsg = "Team saved successfully!";
        this.cd.detectChanges();
        setTimeout(() => {
          if(this.isNew){
            this.goToEditMode();
          }else{
            this.router.navigate(['/teams']);
          }
        }, 5000);        
      }, error: (res) => {
          if(!res.error){
            this.errorMsg = 'Ups! Something was wrong trying to save Team, please contact to your support!!';
          }else{
            this.errorMsg = res.error.msg;
          }
          this.cd.detectChanges();
      }
    });
  }

  getTeam(idTeam: Number){
    this.teamSrv.getTeamById(idTeam).subscribe({
      next: (res) => {
        this.team = {...res};
        Promise.resolve().then(() => this.cd.detectChanges());
      }, error: () =>{
        this.errorMsg = 'Something was wrong trying to get Team informatión';
      }
    });
  }

  goToEditMode(){
    this.router.navigate(['/edit-team/' + this.team.idTeam]);
  }

  getMembers(){
    this.members$ = this.memberSrv.listMembers();
  }

  compareMember(m1: Member, m2: Member){
    return m1 && m2 ? m1.idMember === m2.idMember : m1 === m2;
  }

  setupFilter(){
    this.filteredMembers$ = combineLatest([this.members$, this.memberFilter$]).pipe(
      map(([members, filter]) => 
        members.filter( m => 
          !filter ||
          (m.phone.slice(-3) + '-' + m.name).toLowerCase().includes(filter.toLowerCase())
        )
      )
    )
  }
}
