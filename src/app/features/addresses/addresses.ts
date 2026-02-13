import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AddressDto } from '../../shared/models/address.model';
import { AddressService } from '../../core/services/address.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddressCe } from './address-ce/address-ce';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-addresses',
  imports: [CommonModule, FormsModule],
  templateUrl: './addresses.html',
  styleUrl: './addresses.css',
})
export class Addresses implements OnInit{
  @Input() idMember !: String; 

  constructor(
    private addressSrv: AddressService,
    private dialog: MatDialog
  ){}

  addresses$ !: Observable<AddressDto[]>;

  ngOnInit(){
    this.getAddresses();
  }

  getAddresses(){
    this.addresses$ = this.addressSrv.listAddressesByMember(+this.idMember);
  }

  openAddressForm(idAddress?: number) {
    const dialogRef = this.dialog.open(AddressCe, {
      width: '600px',
      data: {
        idMember: this.idMember,   // siempre pasas el miembro
        idAddress: idAddress || null // si existe, edición; si no, alta
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {        
        this.getAddresses(); // refresca listado
      }
    });
  }
}
