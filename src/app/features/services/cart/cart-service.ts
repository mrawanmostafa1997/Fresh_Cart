import { HttpClient } from '@angular/common/http';
import { inject, Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { enviroment } from '../../../enviroment/enviroment';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartResponse } from '../../interfaces/cart';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public cartNo: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  constructor(private _HttpClient: HttpClient) {
    if (this.isBrowser) {
      this.getCart().subscribe({
        next: (res) => {
          this.cartNo.next(res.numOfCartItems);
        },
        error: (err) => {},
        complete: () => {},
      });
    }
  }
  getCart(): Observable<CartResponse> {
    return this._HttpClient.get<CartResponse>(
      `${enviroment.baseUrl}/api/v1/cart`,
      {
        headers: {
          token: localStorage.getItem('userToken') || '',
        },
      }
    );
  }
  addToCart(productId: string): Observable<CartResponse> {
    return this._HttpClient.post<CartResponse>(
      `${enviroment.baseUrl}/api/v1/cart`,
      {
        productId: productId,
      },
      {
        headers: {
          token: localStorage.getItem('userToken') || '',
        },
      }
    );
  }

  updateProductCartQuantity(
    productId: string,
    count: string
  ): Observable<CartResponse> {
    return this._HttpClient.put<CartResponse>(
      `${enviroment.baseUrl}/api/v1/cart/${productId}`,
      {
        count: count,
      },
      {
        headers: {
          token: localStorage.getItem('userToken') || '',
        },
      }
    );
  }

  removeProductFromCart(productId: string): Observable<CartResponse> {
    return this._HttpClient.delete<CartResponse>(
      `${enviroment.baseUrl}/api/v1/cart/${productId}`,
      {
        headers: {
          token: localStorage.getItem('userToken') || '',
        },
      }
    );
  }
  clearCart(): Observable<CartResponse> {
    return this._HttpClient.delete<CartResponse>(
      `${enviroment.baseUrl}/api/v1/cart`,
      {
        headers: {
          token: localStorage.getItem('userToken') || '',
        },
      }
    );
  }
}
