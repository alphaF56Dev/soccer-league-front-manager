    import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Country } from '../../shared/models/country.model';
import { CountryService } from '../../core/services/country.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MenuButton } from "../common-components/menu-button/menu-button";
import { Router } from '@angular/router';

@Component({
  selector: 'app-countries',
  imports: [CommonModule, FormsModule, MenuButton],
  standalone: true, 
  templateUrl: './countries.html',
  styleUrl: './countries.css'
})
export class Countries {
  constructor(private countrySrv: CountryService){}
  private router = inject(Router);
  countries$!: Observable<Country[]>;
  
  public countries: Country[] = [];
  public errorMsg: String = "";

  ngOnInit(){
    console.log("Countries component inicializado");
    this.getCountries();
  }

  getCountries(){
    this.countries$ = this.countrySrv.listCountries();
  }

  addCountry(){
    this.router.navigate(['/country-form']);   
  }

  modifyCountry(id_country: number){
    this.router.navigate(['/edit-country/', id_country]);
  }

}
