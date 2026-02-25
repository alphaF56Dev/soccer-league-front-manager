import { ChangeDetectorRef, Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { TeamCategoryService } from '../../../core/services/team-category.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TeamCategoryDto } from '../../../shared/models/team.model';

@Component({
  selector: 'app-categories-by-team',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './categories-by-team.html',
  styleUrl: './categories-by-team.css',
})
export class CategoriesByTeam implements OnInit{
  @Input() idTeam: Number = 0;

  teamCategories: TeamCategoryDto[] = [];
  errorMsg = '';
  successMsg = '';

  constructor(
    private teamCatSrv: TeamCategoryService,
    private cd: ChangeDetectorRef
  ){}

  ngOnInit(): void {
    
  }

  ngAfterViewInit(){
    if (this.teamCategories.length) {
      this.successMsg = 'Categories for this team loaded successfully!';
    }
  }

  ngOnChanges(changes: SimpleChanges){
    if(changes['idTeam'] && this.idTeam !== 0){
      this.getTeamCategories(this.idTeam);
    }    
  }

  

  getTeamCategories(idTeam: Number){
    this.teamCatSrv.listCategoriesByIdTeam(idTeam).subscribe({
      next: (res) => {
        this.teamCategories = res;
        this.cd.markForCheck();
      }, error: () => {
        this.errorMsg = 'Something was wrong trying to get team categories, please contact your support!';
      }
    });
    this.cd.detectChanges();
  }

  actionOnCheck(idCategory: number, checked?: boolean){
    try {
      if (checked){
        this.teamCatSrv.addCateoryToTeam(this.idTeam, idCategory).subscribe({
          next: (res:any) => {
            this.successMsg = res.msg;
            this.cd.detectChanges();
          }, error: (res) => {
            if(!res){
              this.errorMsg = res.error.msg;
            }else{
              this.errorMsg = 'Something was wrong trying to add category to team, please contact your support!';
            }
            this.cd.detectChanges();
          }
        });     
      }else{ 
        this.teamCatSrv.removeCategoryOfTeam(this.idTeam, idCategory).subscribe({
          next: (res:any) => {
            this.successMsg = res.msg;
            this.cd.detectChanges();
          }, error: (res) => {           
            if(res){
              this.errorMsg = res.error.msg;
            }else{
              this.errorMsg = 'Something was wrong trying to remove category of the team, please contact your support!';
            }
            this.cd.detectChanges();
          }
        }); 
      }
    } catch (error) {
      this.errorMsg = "Something was wrong trying to update Team Category, please contact your support!!";
    }
  }
}
