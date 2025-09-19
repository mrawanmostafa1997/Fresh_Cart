import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CategoryService } from '../../services/category/category-service';
import { Category } from '../../interfaces/category';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-categories',
  imports: [DatePipe],
  templateUrl: './categories.html',
  styleUrl: './categories.scss',
})
export class Categories {
  constructor(
    private _CategoryService: CategoryService,
    private _Router: Router
  ) {}
  CategoryList!: Category[];
  getAllCategories() {
    this._CategoryService.getAllCategories().subscribe({
      next: (res) => {
        this.CategoryList = res.data;
      },
      error: (err) => {},
      complete: () => {},
    });
  }
  getCategoryProducts(categoryId: string) {
    this._CategoryService.getCategoryById(categoryId).subscribe({
      next: (res) => {
        this._Router.navigate(['/products'], {
          queryParams: { 'category[in]': categoryId },
          queryParamsHandling: 'merge',
        });
      },
      error: (err) => {},
      complete: () => {},
    });
  }
  ngOnInit(): void {
    this.getAllCategories();
  }
  selectCategory(categoryId: string) {
    this.getCategoryProducts(categoryId);
  }
}
