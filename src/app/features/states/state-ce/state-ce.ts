import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { State } from '../../../shared/models/state.model';
import { Country } from '../../../shared/models/country.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { CountryService } from '../../../core/services/country.service';
import { StateService } from '../../../core/services/state.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-state-ce',
  imports: [CommonModule, FormsModule],
  templateUrl: './state-ce.html',
  styleUrl: './state-ce.css',
})
export class StateCe implements OnInit{
  constructor(private stateSrv: StateService, private countrySrv: CountryService, private cd: ChangeDetectorRef){}

  router = inject(Router);
  route = inject(ActivatedRoute);

  state: State = { idCountry: {} as Country, name: '', code: '', shortName: '' };
  successMsg = '';
  errorMsg = '';
  isEdit = false;

  countries$ !: Observable<Country[]>;

  ngOnInit(){
    this.getCountries();
    const id = this.route.snapshot.paramMap.get('id_state');
    if(id){
      this.isEdit = true;
      this.getState(+id);
    }
  }

  saveOrUpdateState(){
    this.stateSrv.saveState(this.state).subscribe({
      next: () => {
        this.successMsg = 'State saved successfully';
        setTimeout(() => this.goStates(), 3000);
      }, error: () =>{
        this.errorMsg = 'Error trying to save State!';
      }
    });
  }

  goStates(){
    this.router.navigate(['/states']);
  }

  getCountries(){
    this.countries$ = this.countrySrv.listCountries();
  }

  getState(state_id: number){
    this.stateSrv.getStateById(state_id).subscribe({
      next: (res) => {
        this.state = {... res };
        this.cd.detectChanges();
      }, error: () =>{
        this.errorMsg = "Ups! something was wrong getting country information, please contact your support!!";
      }
    })
  }

  compareCountry(c1: Country, c2: Country){
    return c1 && c2 ? c1.id_country === c2.id_country : c1 === c2
  }
}
