import { ChangeDetectorRef, Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { Country } from '../../../shared/models/country.model';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { CountryService } from '../../../core/services/country.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-country-ce',
  imports: [CommonModule, FormsModule],
  templateUrl: './country-ce.html',
  styleUrl: './country-ce.css',
})
export class CountryCe implements OnInit{
  @ViewChild('countryName') countryName!: ElementRef;
  //@ViewChild('countryIso') countryIso!: ElementRef;
  constructor(private countrySrv: CountryService, private cd: ChangeDetectorRef) {}
  country: Country = { name: '', iso: '' };
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  isEdit = false;

  errorMsg = '';
  successMsg = '';

  ngOnInit(){
    const id_country = this.route.snapshot.paramMap.get('id_country');
    if(id_country){
      this.isEdit = true;
      this.getCountry(+id_country);      
    }
  }

  saveCountry(){
    this.countrySrv.saveCountry(this.country).subscribe({
      next: (res)=>{
        this.successMsg = "Country saved successed";
        this.goCountries();
        /*this.countryName.nativeElement.focus();
        this.countryIso.nativeElement.focus();*/
        this.countryName.nativeElement.focus();
      }, error: () =>{
        this.errorMsg = "Ups! something was wrong saving country, please contact your support!!";
      }
    })
  }

  goCountries(){
    console.log("redirigiendo una vez guardado el registro.");    
    this.router.navigate(['/countries']);
  }

  getCountry(id_country: number){
    this.countrySrv.getCountry(id_country).subscribe({
      next: (res) => {
        this.country = { ...res };
        this.cd.detectChanges();
      }, error: () =>{
        this.errorMsg = "Ups! something was wrong getting country information, please contact your support!!";
      }
  })
  }

}
