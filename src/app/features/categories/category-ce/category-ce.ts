import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from "@angular/material/select";
import { MatRadioModule } from '@angular/material/radio';
import { CategoryService } from '../../../core/services/category.service';
import { Category } from '../../../shared/models/category.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-category-ce',
  imports: [
    CommonModule, 
    FormsModule,
    MatSelectModule,
    MatRadioModule
  ],
  templateUrl: './category-ce.html',
  styleUrl: './category-ce.css',
})
export class CategoryCe implements OnInit{
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  category: Category = {
    description: '',
    isActive: true,
    duration: 0,
    maxAge: 99,
    minAge: 0,
    name:'',
    sex: ''
  };
  isEdit = false;
  successMsg: String = '';
  errorMsg: String = '';
  
  constructor(
    private categorySrv: CategoryService,
    private cd: ChangeDetectorRef
  ){}

  ngOnInit(){
    const id = this.route.snapshot.paramMap.get('idCategory');
    if(id){
      this.isEdit = true;
      this.getCategory(+id);
    }
  }

  saveCategory(){
    this.categorySrv.saveCategory(this.category).subscribe({
      next: () =>{
        this.successMsg = 'Category saved successfully!';
        this.router.navigate(['/categories']);
      },
      error: () =>{
        this.errorMsg = 'Error trying to save Category!';
      }
    });
  }

  getCategory(idCategory: Number){
    this.categorySrv.getCategoryById(idCategory).subscribe({
      next: (res) => {
        this.category = { ... res};
        this.cd.detectChanges();
      }, error: () => {
        this.errorMsg = 'Ups! something was wrong getting categiry league information, please contact your support!!';
      }
    });
  }
}
