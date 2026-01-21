import { Component, OnInit } from '@angular/core';
import { MenuButton } from "../common-components/menu-button/menu-button";
import { MemberTypeService } from '../../core/services/membertype.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { MemberType } from '../../shared/models/membertype.model';

@Component({
  selector: 'app-members-type',
  imports: [CommonModule, FormsModule,MenuButton],
  templateUrl: './members-type.html',
  styleUrl: './members-type.css',
})
export class MembersType implements OnInit{

  constructor(private mtSrv : MemberTypeService){}

  membersType$ !: Observable<MemberType[]>;

  ngOnInit() {
    this.getMembersType();
  }

  addMemberType(){
    console.log('Adding member type ...');    
  }

  modifyMemberType(idMemberType: number){
    console.log('Modifying member type ...');    
  }

  getMembersType(){
    this.membersType$ = this.mtSrv.listMembersType();
  }
}
