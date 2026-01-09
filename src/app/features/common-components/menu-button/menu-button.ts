import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-button',
  imports: [],
  templateUrl: './menu-button.html',
  styleUrl: './menu-button.css',
})
export class MenuButton {
  constructor(private router: Router) {}

  goToMenu() {
    this.router.navigate(['/menu']);
  }
}
