import { Component, inject } from '@angular/core';
import { Country } from '../../../shared/models/country.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CountryService } from '../../../core/services/country.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-country-ce',
  imports: [CommonModule, FormsModule],
  templateUrl: './country-ce.html',
  styleUrl: './country-ce.css',
})
export class CountryCe {
  constructor(private countrySrv: CountryService) {}
  country: Country = { name: '', iso: '' };
  private router = inject(Router);


  errorMsg = '';
  successMsg = '';

  saveCountry(){
    console.log("Saving country. . . ", this.country);
    this.countrySrv.saveCountry(this.country).subscribe({
      next: (res)=>{
        this.successMsg = "Country saved successed";
        this.goCountries();
      }, error: () =>{
        this.errorMsg = "Ups! something was wrong please contact your support!!";
      }
    })
  }

  goCountries(){
    console.log("redirigiendo una vez guardado el registro.");    
    this.router.navigate(['/countries']);
  }

}
