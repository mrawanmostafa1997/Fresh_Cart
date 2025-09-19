import { Component, OnInit } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CategoryService } from '../../../../../services/category/category-service';
import { Category } from '../../../../../interfaces/product';
@Component({
  selector: 'app-categoryslider',
  imports: [CarouselModule],
  templateUrl: './categoryslider.html',
  styleUrl: './categoryslider.scss',
})
export class Categoryslider implements OnInit {
  CategoryList!: Category[];
  constructor(private _CategoryService: CategoryService) {}

  ngOnInit(): void {
    this.getAllCategories();
  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplaySpeed: 1,

    autoplay: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 7,
      },
    },
    nav: true,
  };
  getAllCategories() {
    this._CategoryService.getAllCategories().subscribe({
      next: (res) => {
        this.CategoryList = res.data;
      },
      error: (err) => {},
      complete: () => {},
    });
  }
}
