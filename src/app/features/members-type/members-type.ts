import { Component, inject, OnInit } from '@angular/core';
import { MenuButton } from "../common-components/menu-button/menu-button";
import { MemberTypeService } from '../../core/services/membertype.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { MemberType } from '../../shared/models/membertype.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-members-type',
  imports: [CommonModule, FormsModule,MenuButton],
  templateUrl: './members-type.html',
  styleUrl: './members-type.css',
})
export class MembersType implements OnInit{

  constructor(private mtSrv : MemberTypeService){}

  router = inject(Router);

  membersType$ !: Observable<MemberType[]>;

  ngOnInit() {
    this.getMembersType();
  }

  addMemberType(){
    this.router.navigate(['/member-type-form']);
  }

  modifyMemberType(idMemberType?: Number){
    this.router.navigate(['/edit-member-type/'+idMemberType]);
  }

  getMembersType(){
    this.membersType$ = this.mtSrv.listMembersType();
  }
}
