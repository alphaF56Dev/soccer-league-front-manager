import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-menu',
  imports: [],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu {
  private router = inject(Router);
  logout(){
    sessionStorage.clear();
    this.router.navigate(['/login']);  
  }

  goToUsers(){
    alert('Not available now!!!');
  }

  goToCountries(){
    this.router.navigate(['/countries']);
  }

  goToStates(){
    this.router.navigate(['/states']);
  }

  goToMunicipalities(){
    this.router.navigate(['/municipalities']);
  }

  goToMembersType(){
    this.router.navigate(['/members-type']);
  }

  goToMembers(){
    this.router.navigate(['/members']);
  }
}
