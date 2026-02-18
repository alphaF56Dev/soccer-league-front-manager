import { Component, inject, OnInit } from '@angular/core';
import { PositionService } from '../../core/services/position.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PositionCatalog } from '../../shared/models/position.model';
import { MenuButton } from "../common-components/menu-button/menu-button";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-positions',
  imports: [
    CommonModule,
    FormsModule,
    MenuButton
  ],
  templateUrl: './positions.html',
  styleUrl: './positions.css',
})
export class Positions implements OnInit{
  private router = inject(Router);
  constructor(private positionSrv: PositionService){}
  positions$!: Observable<PositionCatalog[]>;

  ngOnInit(){
    this.getPositions();
  }

  getPositions(){
    this.positions$ = this.positionSrv.listPositions();
  }

  addPosition(){
    console.log('Adding new position. . .');
    
  }

  modifyPosition(id?:Number){
    console.log('Modifying a position. . .');
  }
}
