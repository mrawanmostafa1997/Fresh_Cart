import { Component, OnInit, Pipe } from '@angular/core';
import { ProductService } from '../../services/product/product-service';
import { Product } from '../../interfaces/product';
import { CurrencyPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-productdetails',
  imports: [CurrencyPipe],
  templateUrl: './productdetails.html',
  styleUrl: './productdetails.scss',
})
export class Productdetails implements OnInit {
  product!: Product;
  constructor(
    private _ProductService: ProductService,
    private _ActivatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.getProductById();
  }
  getProductById() {
    let id = '';
    this._ActivatedRoute.params.subscribe({
      next: (res) => {
        id = res?.['id'];
      },
    });
    console.log(id);
    if (id) {
      this._ProductService.getSpecificProduct(id).subscribe({
        next: (res) => {
          this.product = res.data;
          console.log(this.product);
        },
        error: () => {},
        complete: () => {},
      });
    }
  }
}
