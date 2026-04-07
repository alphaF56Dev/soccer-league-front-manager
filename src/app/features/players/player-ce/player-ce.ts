import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Player } from '../../../shared/models/player.model';
import { Member } from '../../../shared/models/member.model';
import { PositionCatalog } from '../../../shared/models/position.model';
import { observable, Observable } from 'rxjs';
import { PositionService } from '../../../core/services/position.service';
import { PlayerService } from '../../../core/services/player.service';

@Component({
  selector: 'app-player-ce',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './player-ce.html',
  styleUrl: './player-ce.css',
})
export class PlayerCe implements OnInit, OnChanges{

  @Input() idMember !: string;

  player: Player = {
    member: {} as Member,
    position: {} as PositionCatalog,
    nickname: ''
  }
  positions$!: Observable<PositionCatalog[]>;
  successMsg= '';
  errorMsg= '';

  constructor(
    private srvPosition: PositionService,
    private srvPlayer: PlayerService,
    private cd: ChangeDetectorRef
  ){}

  ngOnInit() {
    this.getPositions();
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['idMember']){
      this.player.member.idMember = +this.idMember;
      this.getPlayerInfoByIdMember(+this.idMember);
    }
  }

  getPositions(){
    this.positions$ = this.srvPosition.listPositions();
  }

  savePlayer(){  
    this.srvPlayer.savePlayer(this.player).subscribe({
      next: (res) => {
        this.errorMsg = '';
        this.successMsg = 'Role player information saved!';
        this.cd.detectChanges();
      },error: () => {
        this.successMsg = '';
        this.errorMsg = 'Ups, something was wrong trying to save the player information, please contact your administrator!!!';
        this.cd.detectChanges();
      }      
    });
    
  }

  getPlayerInfoByIdMember(idMember: number){
    this.srvPlayer.getPlayerByIdMember(idMember).subscribe({
      next: (res) => {        
        this.player =  {... res};      
        this.cd.markForCheck();
      },
      error: (error) => {        
        if (error.status === 404){
          this.errorMsg = 'Rol player information has not been assigned, please fill out the form and save changes.';
        }else{
          this.errorMsg = 'Ups, something was wrong getting player information, please contact your administrator!!!';
        }
      }
    });
  }

  comparePosition(p1:PositionCatalog, p2:PositionCatalog){
    return p1 && p2 ? p1.idPosition === p2.idPosition : p1 === p2;
  }
}
