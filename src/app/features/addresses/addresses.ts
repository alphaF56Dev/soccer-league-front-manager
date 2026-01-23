import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AddressDto } from '../../shared/models/address.model';
import { AddressSerice } from '../../core/services/address.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-addresses',
  imports: [CommonModule, FormsModule],
  templateUrl: './addresses.html',
  styleUrl: './addresses.css',
})
export class Addresses implements OnInit{
  @Input() idMember !: String; 

  constructor(private addressSrv: AddressSerice){}

  addresses$ !: Observable<AddressDto[]>;

  ngOnInit(){
    this.getAddresses();
  }

  getAddresses(){
    this.addresses$ = this.addressSrv.listAddressesByMember(+this.idMember);
  }

  modifyAddress(idAddress?: Number){
    console.log('Editing address...');
  }

  addAddress(){
    console.log('Adding address...');
    
  }
}
