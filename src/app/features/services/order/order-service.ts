import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../../enviroment/enviroment';
import { OrderResponse, ShippingAddress } from '../../interfaces/order';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private _HtttpClient: HttpClient) {}
  createCashOrder(cardOrderId: string, shippingAddress: ShippingAddress) {
    return this._HtttpClient.post<OrderResponse>(
      `${enviroment.baseUrl}/api/v1/orders/${cardOrderId}`,
      shippingAddress,
      {
        headers: {
          token: localStorage.getItem('userToken') || '',
        },
      }
    );
  }
  checkoutSession(
    cardOrderId: string,
    shippingAddress: ShippingAddress
  ): Observable<any> {
    return this._HtttpClient.post(
      `${enviroment.baseUrl}/api/v1/orders/checkout-session/${cardOrderId}?url=${enviroment.domaoin}`,
      shippingAddress,
      {
        headers: {
          token: localStorage.getItem('userToken') || '',
        },
      }
    );
  }
  getAllOrders(): Observable<OrderResponse> {
    return this._HtttpClient.get<OrderResponse>(
      `${enviroment.baseUrl}/api/v1/orders`,
      {
        headers: {
          token: localStorage.getItem('userToken') || '',
        },
      }
    );
  }
}
