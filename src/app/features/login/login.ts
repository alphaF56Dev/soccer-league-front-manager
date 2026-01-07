import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserAccess } from '../../shared/models/user_access.model';
import { LoginService } from '../../core/services/login.service';
import { CommonModule } from '@angular/common';


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

  public user:UserAccess = {
    username:'',
    pw: ''
  };

  login(){
    console.log("access obj: ", this.user)
    this.loginSrv.auth(this.user).subscribe(res => {
      console.log('Loggin success!!!');
    }, error => {
      console.log(error);
    });
      
  }

}
