import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavButton } from '../../common-components/nav-button/nav-button';
import { Field } from '../../../shared/models/field.model';
import { Municipality } from '../../../shared/models/municipality.model';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { Country } from '../../../shared/models/country.model';
import { State } from '../../../shared/models/state.model';
import { FieldService } from '../../../core/services/field.service';
import { CountryService } from '../../../core/services/country.service';
import { StateService } from '../../../core/services/state.service';
import { MunicipalityService } from '../../../core/services/municipality.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-field-ce',
  imports: [
    FormsModule,
    CommonModule,
    NavButton,
    MatTabsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule
  ],
  templateUrl: './field-ce.html',
  styleUrl: './field-ce.css',
})
export class FieldCe implements OnInit{
  isEdit= false;
  field: Field ={
    name: '',
    address: '',
    isActive: true,
    idMunicipality: {} as Municipality
  }
  successMsg='';
  errorMsg='';
  municipalityFilter='';
  filteredMunicipalities$!: Observable<Municipality[]>;
  

  selectedIdState!: Number;
  filteredStates$!: Observable<State[]>;
  selectedIdCountry!: Number;
  countries$!: Observable<Country[]>;
  route = inject(ActivatedRoute);
  router = inject(Router);

  constructor(
    private fieldSrv: FieldService,
    private countrySrv: CountryService,
    private stateSrv: StateService,
    private municipalitySrv: MunicipalityService,
    private cd: ChangeDetectorRef
  ){}

  ngOnInit(): void {
    this.loadCountries();
  }

  ngAfterViewInit(){
    const id = this.route.snapshot.paramMap.get('idField');
    if(id){      
      this.isEdit = true;
      this.loadField(+id);
      this.cd.detectChanges();  
    }
  }

  loadField(id: Number){
    this.fieldSrv.getFieldById(+id).subscribe({
        next: (res) =>{
          this.field = {... res};
          this.selectedIdCountry = (this.field.idMunicipality.idState.idCountry.id_country) ? this.field.idMunicipality.idState.idCountry.id_country : 0;
          this.selectedIdState = (this.field.idMunicipality.idState.id_state) ? this.field.idMunicipality.idState.id_state : 0;        
        }
      });
  }

  loadCountries(){
    this.countries$ = this.countrySrv.listCountries();
  }

  
  saveOrUpdateField(){
    this.fieldSrv.saveField(this.field).subscribe({
      next: (res) => {
        res = {... res};
        this.successMsg = 'Field saved successfully!!!';
        this.errorMsg = '';
        this.cd.detectChanges();
        if(!this.isEdit){
          this.router.navigate(['/edit-field/' + res.idField]);
        }
      }, error: () => {
        this.successMsg = '';
        this.errorMsg = 'Something was wrong trying to save the field. Please contact your support.';
        this.cd.detectChanges();
      }
    });
  }

  onCountryChange(idCountry?: Number){
    this.filteredStates$ = this.stateSrv.listStatesByIdCountry(idCountry? idCountry:0);
  }

  onStateChange(idState: Number){
    this.filteredMunicipalities$ = this.municipalitySrv.listMunicipalitiesByIdState(idState);
  }
}
