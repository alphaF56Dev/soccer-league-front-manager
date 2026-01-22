import { Component, inject, OnInit } from '@angular/core';
import { MenuButton } from "../common-components/menu-button/menu-button";
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MemberService } from '../../core/services/member.service';
import { Member } from '../../shared/models/member.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-members',
  imports: [CommonModule, FormsModule, MenuButton],
  templateUrl: './members.html',
  styleUrl: './members.css',
})
export class Members implements OnInit{

  constructor(private memberSrv: MemberService){}

  router = inject(Router);

  members$ !: Observable<Member[]>;
  filteredmembers$!: Observable<Member[]>;

  filters = {
    name: new BehaviorSubject<string>(''),
    email: new BehaviorSubject<string>(''),
    memberType: new BehaviorSubject<string>(''),
    sex: new BehaviorSubject<string>('')
  };

  ngOnInit(){
    this.getMembers();
    this.setupFilters();
  }

  getMembers(){
    this.members$ = this.memberSrv.listMembers();
  }

  private setupFilters(){
    this.filteredmembers$ = combineLatest([
      this.members$,
      this.filters.name,
      this.filters.email,
      this.filters.memberType,
      this.filters.sex
    ]).pipe(
      map(([members, name, email, memberType, sex]) => 
        members.filter(m => 
          (!name || m.name.toLowerCase().includes(name.toLowerCase())) &&
          (!email || m.email.toLowerCase().includes(email.toLowerCase())) &&
          (!memberType || m.memberType.name.toLowerCase().includes(memberType.toLowerCase())) &&
          (!sex || m.sex.toLowerCase().includes(sex.toLowerCase()))
        )
      )
    )
  }


  addMember(){
    this.router.navigate(['/member-form']);
  }

  modifyMember(idMember?: Number){
    this.router.navigate(['/edit-member/' + idMember]);    
  }
}
