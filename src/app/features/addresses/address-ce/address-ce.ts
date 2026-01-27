import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { Address, AddressDto } from '../../../shared/models/address.model';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { AddressService } from '../../../core/services/address.service';
import { Member } from '../../../shared/models/member.model';
import { Municipality } from '../../../shared/models/municipality.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Observable } from 'rxjs';
import { MunicipalityService } from '../../../core/services/municipality.service';
import { MatSelectModule } from '@angular/material/select';
import { MemberType } from '../../../shared/models/membertype.model';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-address-ce',
  imports: [
    CommonModule, 
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule
  ],
  templateUrl: './address-ce.html',
  styleUrl: './address-ce.css',
})
export class AddressCe implements OnInit{

  address!: Address;
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
  municipality!: Municipality;
  municipalities$ !: Observable<Municipality[]>;
  isEdit = false;
  municipalityFilter:String = '';
  filteredMunicipalities: Municipality[] = [];
  municipalities: Municipality[] = [];
  successMsg =  '';
  errorMsg = '';

  constructor(
    public dialogRef: MatDialogRef<AddressCe>,
    @Inject(MAT_DIALOG_DATA) public data:{idMember: Number, idAddress?: Number},
    private addressSrv: AddressService,
    private muniSrv: MunicipalityService,
    private cd: ChangeDetectorRef
  ){ }

  ngOnInit(){
    this.getMunicipalities();
    this.address = {
        addressName: '',
        street: '',
        extNumber: '',
        intNumber: '',
        suburb: '',
        zip: '',
        fullAddress: '',
        idMunicipality:{} as Municipality,
        idMember: {} as Member
      }
    
    if(this.data.idAddress){
      this.isEdit = true;
      this.getAddressById(this.data.idAddress);
    }else{
      this.member.idMember = this.data.idMember;
      this.address.idMember = this.member;
    }
  }

  getMunicipalities(){
    this.municipalities$ = this.muniSrv.listMunicipalities();
  }

  getAddressById(idAddress: Number){
    this.addressSrv.getAddressById(idAddress).subscribe({
      next: (res) => {
        this.address = { ... res };
        this.cd.detectChanges();
      }, error: () => {
        this.errorMsg = 'Ups! something was wrong getting Address information, please contact your support!!!';
      }
    });
  }

  saveAddress(){
    this.addressSrv.saveAddress(this.address).subscribe({
      next: () => {
        //this.successMsg = 'Address saved successfully!';
        setTimeout(() => {
          this.dialogRef.close();
        }, 3000);
      }, error: () => {
        this.errorMsg = 'Ups! Something was wrong trying to save Address, please contact to your support!!!';
      }
    });    
  }

  compareMunicipality(m1: Municipality, m2: Municipality){
    return m1 && m2 ? m1.idMunicipality === m2.idMunicipality : m1 === m2;
  }

  filterMunicipalities() {
    const filter = this.municipalityFilter.toLowerCase();
    this.filteredMunicipalities = this.municipalities.filter(m =>
      m.name.toLowerCase().includes(filter)
    );
  }

  onCancel(){
    this.dialogRef.close();
  }

}
