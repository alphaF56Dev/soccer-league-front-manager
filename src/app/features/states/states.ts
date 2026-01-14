import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { State } from '../../shared/models/state.model';
import { StateService } from '../../core/services/state.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuButton } from '../common-components/menu-button/menu-button';
import { Router } from '@angular/router';
@Component({
  selector: 'app-states',
  imports: [CommonModule, FormsModule, MenuButton],
  standalone: true, 
  templateUrl: './states.html',
  styleUrl: './states.css',
})
export class States implements OnInit{

  constructor(private stateSrv: StateService){}
  private router = inject(Router);
  public errorMsg:String = "";

  states$!: Observable<State[]>;

  ngOnInit() {
    this.getStates();
  }

  getStates(){
    this.states$ = this.stateSrv.listStates();
  }

  modifyState(stateId?: number){
    this.router.navigate(['/edit-state/' + stateId])   
  }

  addState(){
    this.router.navigate(['/state-form']);
  }
}
