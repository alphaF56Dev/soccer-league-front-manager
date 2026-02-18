import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { PositionService } from '../../../core/services/position.service';
import { PositionCatalog } from '../../../shared/models/position.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-position-ce',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './position-ce.html',
  styleUrl: './position-ce.css',
})
export class PositionCe implements OnInit{
  position: PositionCatalog ={
    code: '',
    name: '',
    description: ''
  };
  idEdit = false;
  successMsg = '';
  errorMsg = '';
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  constructor(
    private positionSrv: PositionService,
    private cd: ChangeDetectorRef
  ){}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('idPosition');
    if(id){
      this.getPosition(+id);
    }
  }

  savePosition(){
    this.positionSrv.savePosition(this.position).subscribe({
      next: () => {
        this.successMsg = 'Position saved successfully';
        setTimeout(() => this.goPositions(), 3000);
      }, error: () => {
        this.errorMsg = 'Error trying to save position!';
      }
    });
  }

  getPosition(idPosition: Number){
    this.positionSrv.getPositionById(idPosition).subscribe({
      next: (res) => {
        this.position = {... res};
        this.cd.detectChanges();
      }, error: () => {
        this.errorMsg = 'Somthing was wrong trying to get position, please contact your support!!!';
      }
    });
  }

  goPositions(){
    this.router.navigate(['/positions']);
  }
}
