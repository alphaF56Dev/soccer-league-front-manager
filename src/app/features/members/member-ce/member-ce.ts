import { ChangeDetectorRef, Component, inject, NgZone, OnInit } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { Member } from '../../../shared/models/member.model';
import { MemberType } from '../../../shared/models/membertype.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs'
import { MemberService } from '../../../core/services/member.service';
import { MemberTypeService } from '../../../core/services/membertype.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NavButton } from "../../common-components/nav-button/nav-button";

@Component({
  selector: 'app-member-ce',
  imports: [CommonModule,
    FormsModule,
    MatTabsModule, NavButton],
  templateUrl: './member-ce.html',
  styleUrl: './member-ce.css',
})
export class MemberCe implements OnInit{

  constructor(
    private memberSrv: MemberService, 
    private mtSrv: MemberTypeService,
    private cd: ChangeDetectorRef,
    private zone: NgZone
  ){}

  router = inject(Router);
  route = inject(ActivatedRoute);

  member: Member = {
    memberType: {} as MemberType,
    name: '',
    personalId: '',
    birthday: '',
    phone: '',
    sex: '',
    email: '',
    isActive: true,
    nationality: ''
  };

  memberstype$ !: Observable<MemberType[]>;
  isEdit = false;
  successMsg ='';
  errorMsg = '';
  isNew = false;


  ngOnInit() {
    this.getMembersType();    
  }

  ngAfterViewInit(){
    const id = this.route.snapshot.paramMap.get('idMember');
    if (id) {
      this.isEdit = true;
      this.getMember(+id);
    }
  }

  saveOrUpdateMember(){
    this.member.birthday = this.parseLocalDate(this.member.birthday).toISOString().split('T')[0];
    this.isNew = this.member.idMember ? false : true;
    this.memberSrv.saveMember(this.member).subscribe({
      next: (res) => {
        this.member = {... res};
        this.successMsg = 'Member saved succesfully!';
        if(this.isNew){
          this.goEditMode();
        }else{
          this.router.navigate(['/members']);
        }
      },error: () => {
        this.errorMsg = 'Ups! Something was wrong trying to save Member, please contact to your support!!!';
      }
    })
  }

  parseLocalDate(dateString: String): Date {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day); // crea Date en hora local
  }


  getMembersType(){
    this.memberstype$ = this.mtSrv.listMembersType();
  }

  compareMemberType(mt1: MemberType, mt2: MemberType){
    return mt1 && mt2 ? mt1.idMember === mt2.idMember : mt1 === mt2;
  }

  goEditMode(){
    this.router.navigate(['/edit-member/'+this.member.idMember]);
  }

  getMember(idMember: Number){
    this.memberSrv.getMemberById(idMember).subscribe({
      next: (res) => {
        this.member = { ... res};
        Promise.resolve().then(() => this.cd.detectChanges());
      }, error: () =>{
        this.errorMsg = "Ups! something was wrong getting member information, please contact your support!!";
      }
    });
  }

}
