import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserAccess } from '../../shared/models/user_access.model';
import { LoginService } from '../../core/services/login.service';
import { CommonModule } from '@angular/common';
import { response } from 'express';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
  standalone: true,
  providers:[HttpClient]
})
export class Login {
  constructor(private loginSrv:LoginService){}
  private router = inject(Router);

  public user:UserAccess = {
    username:'',
    pw: ''
  };

  public errorMsg = '';

  login(){
    this.loginSrv.auth(this.user).subscribe(res => {
      const token = res.token;
      sessionStorage.setItem('jwt', token);
      this.router.navigate(['/menu']);
    }, error => {
      this.errorMsg = 'X Invalid credentials.';
    });
      
  }

}
