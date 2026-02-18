import { Component, inject, OnInit } from '@angular/core';
import { MenuButton } from "../common-components/menu-button/menu-button";
import { Observable } from 'rxjs';
import { Category } from '../../shared/models/category.model';
import { CategoryService } from '../../core/services/category.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  imports: [CommonModule, FormsModule, MenuButton],
  templateUrl: './categories.html',
  styleUrl: './categories.css',
})
export class Categories implements OnInit{
  private router = inject(Router);

  constructor(private categorySrv: CategoryService){}

  categories$!: Observable<Category[]>;

  ngOnInit() {
    this.getCategories();
  }

  getCategories(){
    this.categories$ = this.categorySrv.listCategories();
  }

  addCategory(){
    this.router.navigate(['/category-form']);
  }

  modifyCategory(idCategory?: Number){
    this.router.navigate(['/edit-category/'+idCategory]);
  }
}
