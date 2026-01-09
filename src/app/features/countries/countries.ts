import { ChangeDetectorRef, Component } from '@angular/core';
import { Country } from '../../shared/models/country.model';
import { CountryService } from '../../core/services/country.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-countries',
  imports: [CommonModule, FormsModule],
  standalone: true, 
  templateUrl: './countries.html',
  styleUrl: './countries.css'
})
export class Countries {
  constructor(private countrySrv: CountryService){}

  countries$!: Observable<Country[]>;
  
  public countries: Country[] = [];
  public errorMsg: String = "";

  ngOnInit(){
    console.log("Countries component inicializado");
    this.getCountries();
  }

  getCountries(){
    console.log("obteniendo lista.....");
    
    /*this.countrySrv.listCountries().subscribe({
      next: (res: Country[]) => {
        this.countries = res;
        console.log("*++++response: ", this.countries);
      },error: () =>{
        this.errorMsg = 'Error getting country list';
      }      
    })*/
    this.countries$ = this.countrySrv.listCountries();
  }

  addCountry(){
    console.log("Redireccionando a formulario. . . ");    
  }

}
