import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product/product-service';
import { Product } from '../../interfaces/product';
import { Productcard } from '../../../shared/components/productcard/productcard';
import { Homeslider } from '../features/components/layout/homeslider/homeslider';
import { Categoryslider } from '../features/components/layout/categoryslider/categoryslider';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { SearchPipe } from '../../../shared/pipes/search/search-pipe';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [Productcard, Homeslider, Categoryslider, SearchPipe, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  constructor(
    private _ProductService: ProductService,
    private _ActivatedRoute: ActivatedRoute
  ) {}
  productList!: Product[];
  userWord = '';
  currentPage = 1;
  ngOnInit(): void {
    this._ActivatedRoute.queryParams.subscribe((params) => {
      let page = +params['page'] ? +params['page'] : 1;

      this.currentPage = page;
    });
    this.getAllProducts();
  }

  getAllProducts() {
    this._ProductService.getAllProducts(this.currentPage).subscribe({
      next: (res) => {
        this.productList = res.data ?? [];
      },
      error: (err) => {},
      complete: () => {},
    });
  }
}
