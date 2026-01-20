import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { State } from '../../../shared/models/state.model';
import { Municipality } from '../../../shared/models/municipality.model';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StateService } from '../../../core/services/state.service';
import { MunicipalityService } from '../../../core/services/municipality.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-municipality-ce',
  imports: [CommonModule, 
            FormsModule,
            MatFormFieldModule,
            MatSelectModule,
            MatInputModule,
            MatOptionModule
          ],
  templateUrl: './municipality-ce.html',
  styleUrl: './municipality-ce.css',
})
export class MunicipalityCe implements OnInit{
  constructor(
    private muniSrv: MunicipalityService, 
    private stateSrv: StateService, 
    private cd: ChangeDetectorRef){}

  private router = inject(Router);
  route = inject(ActivatedRoute);

  municipality: Municipality = { idState: {} as State, name: '', shortName: '' };
  states$ !: Observable<State[]>;
  filteredStates$!: Observable<State[]>;

  stateFilter$ = new BehaviorSubject<string>('');

  successMsg = '';
  errorMsg = '';
  isEdit = false;

  ngOnInit() {
    this.getStates();
    this.setupFilter();
    const id = this.route.snapshot.paramMap.get('id_municipality');
    if (id) {
      this.isEdit = true;
      this.getMunicipality(+id);
    }
  }

  getMunicipality(id_municipality: number){
    this.muniSrv.getMunicipalityById(id_municipality).subscribe({
      next: (res) => {
        this.municipality = {... res};
        this.cd.detectChanges();
      }, error: () =>{
        this.errorMsg = 'Ups! something was wrong getting municipality information, please contact your support!!';
      } 
    }
    )
  }

  getStates(){
    this.states$ = this.stateSrv.listStates();
  }

  saveOrUpdateMunicipality(){
    this.muniSrv.saveMunicipality(this.municipality).subscribe({
      next: () =>{
        this.successMsg = 'Municipality saved successfully!';
        this.router.navigate(['/municipalities']);
      }, error: () => {
        this.errorMsg = 'Error trying to save Municipality!';
      }
    });
  }

  compareState(s1: State, s2: State){
    return s1 && s2 ? s1.id_state === s2.id_state : s1 === s2;
  }

  private setupFilter(){
    this.filteredStates$ = combineLatest([this.states$, this.stateFilter$]).pipe(
      map(([states, filter]) =>
        states.filter(s =>
          !filter ||
          (s.idCountry.iso + '-' + s.shortName).toLowerCase().includes(filter.toLowerCase())
        )
      )
    );

    /*const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.municipalitySrv.getMunicipalityById(+id).subscribe({
        next: res => this.municipalityForm.reset(res),
        error: () => (this.errorMsg = 'No se pudo cargar el municipio'),
      });
    }*/

  }

}
