import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart/cart-service';
import { Data } from '../../interfaces/cart';
import { CurrencyPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, RouterLink],

  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart implements OnInit {
  data!: Data;
  constructor(
    private _CartService: CartService,
    private _ToastrService: ToastrService
  ) {}
  ngOnInit(): void {
    this.getLogedUserCart();
  }
  getLogedUserCart() {
    this._CartService.getCart().subscribe({
      next: (res) => {
        this.data = res.data;
      },
      error: (err) => {},
      complete: () => {},
    });
  }
  updateProductCount(productId: string, count: string) {
    this._CartService.updateProductCartQuantity(productId, count).subscribe({
      next: (res) => {
        this.data = res.data;
      },
      error: (err) => {
        this._ToastrService.error(err.error.message, '', {
          timeOut: 3000,
          progressBar: true,
        });
      },
      complete: () => {},
    });
  }
  deleteProductFromCart(productId: string) {
    this._CartService.removeProductFromCart(productId).subscribe({
      next: (res) => {
        this.data = res.data;
        this._CartService.cartNo.next(res.numOfCartItems);
      },

      error: (err) => {
        this._ToastrService.error(err.error.message, '', {
          timeOut: 3000,
          progressBar: true,
        });
      },
      complete: () => {},
    });
  }
  clearCart() {
    this._CartService.clearCart().subscribe({
      next: (res) => {
        this.data = res.data;
        this._CartService.cartNo.next(0);

        this.getLogedUserCart();
      },
      error: (err) => {
        this._ToastrService.error(err.error.message, '', {
          timeOut: 3000,
          progressBar: true,
        });
      },
      complete: () => {},
    });
  }
}
