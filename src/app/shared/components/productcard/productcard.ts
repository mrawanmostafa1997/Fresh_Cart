import { Component, Input, input } from '@angular/core';
import { Product } from '../../../features/interfaces/product';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../../features/services/cart/cart-service';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-productcard',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './productcard.html',
  styleUrl: './productcard.scss',
})
export class Productcard {
  constructor(
    private _CartService: CartService,
    private _ToastrService: ToastrService
  ) {}
  @Input('prd') prd!: Product;
  addProductToCart(productId: string) {
    this._CartService.addToCart(productId).subscribe({
      next: (res) => {
        this._ToastrService.success('The Product is Added Successfully', '', {
          timeOut: 3000,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-bottom-right',
        });
        this._CartService.cartNo.next(res.numOfCartItems);
      },
      error: (err) => {},
      complete: () => {},
    });
  }
}
