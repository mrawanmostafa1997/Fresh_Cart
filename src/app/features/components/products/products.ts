import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product/product-service';
import { Product } from '../../interfaces/product';
import { Productcard } from '../../../shared/components/productcard/productcard';
import { SearchPipe } from '../../../shared/pipes/search/search-pipe';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  imports: [Productcard, SearchPipe, FormsModule, RouterLink],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products implements OnInit {
  productList!: Product[];
  userWord = ' ';
  currentPage = 1;
  brand_id = '';
  category = '';
  constructor(
    private _ProductService: ProductService,
    private _router: Router,
    private _ActivatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this._ActivatedRoute.queryParams.subscribe((params) => {
      let page = +params['page'] ? +params['page'] : 1;
      let brand_id = params['brand'] ? params['brand'] : '';
      let category = params['category[in]'] ? params['category[in]'] : '';
      this.category = category;
      this.brand_id = brand_id;
      this.currentPage = page;
    });
    this.getAllProducts(this.currentPage, this.brand_id, this.category);
  }
  getAllProducts(page: number, brand: string, category: string) {
    this._ProductService.getAllProducts(page, brand, category).subscribe({
      next: (res) => {
        this.productList = res.data ?? [];
      },
      error: (err) => {},
      complete: () => {},
    });
  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this._router.navigate(['/products'], {
        queryParams: { page: this.currentPage - 1 },
        queryParamsHandling: 'merge',
      });
    }
  }
  goToNextPage() {
    this._router.navigate(['/products'], {
      queryParams: { page: this.currentPage + 1 },
      queryParamsHandling: 'merge',
    });
  }
}
