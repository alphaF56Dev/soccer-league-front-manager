import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { Municipality } from '../../shared/models/municipality.model';
import { MunicipalityService } from '../../core/services/municipality.service';
import { MenuButton } from "../common-components/menu-button/menu-button";

@Component({
  selector: 'app-municipalities',
  imports: [CommonModule, FormsModule, MenuButton],
  templateUrl: './municipalities.html',
  styleUrl: './municipalities.css',
})
export class Municipalities implements OnInit{

  constructor(private municSrv: MunicipalityService){}

  filters = {
    idMunicipality: new BehaviorSubject<string>(''),
    state: new BehaviorSubject<string>(''),
    name: new BehaviorSubject<string>(''),
    shortName: new BehaviorSubject<string>('')
  };



  municipalities$ !: Observable<Municipality[]>;
  filteredMunicipalities$!: Observable<Municipality[]>;


  ngOnInit(): void {
    this.getMunicipalities();
    this.setupFilters();
  }

  modifyMunicipality(idMunicipality?: Number){
    console.log("editing municipality....");
    
  }

  getMunicipalities(){
    this.municipalities$ = this.municSrv.listMunicipalities();
  }

  private setupFilters() {
  this.filteredMunicipalities$ = combineLatest([
    this.municipalities$,
    this.filters.idMunicipality,
    this.filters.state,
    this.filters.name,
    this.filters.shortName
  ]).pipe(
    map(([municipalities, idMunicipality, state, name, shortName]) =>
      municipalities.filter(m =>
        (!idMunicipality || m.idMunicipality?.toString().includes(idMunicipality)) &&
        (!state || (m.idState.idCountry.iso + '-' + m.idState.shortName).toLowerCase().includes(state.toLowerCase())) &&
        (!name || m.name.toLowerCase().includes(name.toLowerCase())) &&
        (!shortName || m.shortName.toLowerCase().includes(shortName.toLowerCase()))
      )
    )
  );

}

}
