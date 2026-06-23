import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MenuButton } from '../common-components/menu-button/menu-button';
import { Router } from '@angular/router';
import { FieldDto } from '../../shared/models/field.model';
import { FieldService } from '../../core/services/field.service';
import { BehaviorSubject, combineLatest, map, Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-fields',
  imports: [
    CommonModule,
    FormsModule,
    MenuButton
  ],
  templateUrl: './fields.html',
  styleUrl: './fields.css',
})
export class Fields implements OnInit{
  router = inject(Router);

  filters = {
    municipality: new BehaviorSubject<string>(''),
    name: new BehaviorSubject<string>(''),
    address: new BehaviorSubject<string>('')
  }

  fields$!: Observable<FieldDto[]>;
  filteredFields$!: Observable<FieldDto[]>;

  constructor(
    private fieldSrv: FieldService
  ){}

  ngOnInit() {
   this.loadFields();
   this.setupFilter();
  }

  loadFields(){
    this.fields$ = this.fieldSrv.listFields();
  }

  addField(){
    this.router.navigate(['field-form']);
  }

  modifyField(idField: number){
    this.router.navigate(['edit-field/' + idField]);
  }

  setupFilter(){
    this.filteredFields$ = combineLatest([
      this.fields$, 
      this.filters.municipality,
      this.filters.name,
      this.filters.address,
    ]).pipe(
      map(([fields, municipality, name, address]) => 
        fields.filter(m => 
          (!municipality || m.municipalityName.toLowerCase().includes(municipality.toLowerCase())) &&
          (!name || m.name.toLowerCase().includes(name.toLowerCase())) &&
          (!address || m.address.toLowerCase().includes(address.toLowerCase()))
        )
      )
    )
  }
}
