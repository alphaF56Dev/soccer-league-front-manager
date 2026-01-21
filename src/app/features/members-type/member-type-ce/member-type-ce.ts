import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MemberTypeService } from '../../../core/services/membertype.service';
import { MemberType } from '../../../shared/models/membertype.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-member-type-ce',
  imports: [CommonModule, FormsModule],
  templateUrl: './member-type-ce.html',
  styleUrl: './member-type-ce.css',
})
export class MemberTypeCe implements OnInit{
  constructor(private mtSrv: MemberTypeService, private cd: ChangeDetectorRef){}

  router = inject(Router);
  route = inject(ActivatedRoute);

  memberType: MemberType = {name:'', code: '', isActive: true}
  isEdit: boolean = false;
  successMsg: String = '';
  errorMsg: String = '';

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('idMemberType');
    if(id){
      this.isEdit = true;
      this.getMemberType(+id);
    }
  }

  saveOrUpdateMemberType(){
    this.mtSrv.saveMemberType(this.memberType).subscribe({
      next: () => {
        this.successMsg = 'Member type saved succesfully!';
        this.router.navigate(['/members-type']);
      }
    });
  }

  getMemberType(idMemberType: Number){
    this.mtSrv.getMemberTypeById(idMemberType).subscribe({
      next: (res) =>{
        this.memberType = {... res};
        this.cd.detectChanges();
      }, error: () => {
        this.errorMsg = 'Ups! Something was wrong getting MemberType information, please contact your support!!!';
      }
    });
  }


}
