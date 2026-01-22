import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-button',
  imports: [CommonModule],
  templateUrl: './nav-button.html',
  styleUrl: './nav-button.css',
})
export class NavButton {
  @Input() path!: String;
  @Input() label: String = 'Back';
  
  constructor(private router: Router){}

  navigate(){
    if(this.path){
      this.router.navigate([this.path]);
    }
  }
}
