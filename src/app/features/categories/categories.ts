import { Component, OnInit } from '@angular/core';
import { MenuButton } from "../common-components/menu-button/menu-button";
import { Observable } from 'rxjs';
import { Category } from '../../shared/models/category.model';
import { CategoryService } from '../../core/services/category.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-categories',
  imports: [CommonModule, FormsModule, MenuButton],
  templateUrl: './categories.html',
  styleUrl: './categories.css',
})
export class Categories implements OnInit{

  constructor(private categorySrv: CategoryService){}

  categories$!: Observable<Category[]>;

  ngOnInit() {
    this.getCategories();
  }

  getCategories(){
    this.categories$ = this.categorySrv.listCategories();
  }

  addCategory(){

  }

  modifyCategory(idCategory?: Number){

  }
}
