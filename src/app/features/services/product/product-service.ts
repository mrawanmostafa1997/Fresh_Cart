import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../../../enviroment/enviroment';
import { Product, ProductResponse } from '../../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private _HttpClient: HttpClient) {}

  getAllProducts(
    page?: number,
    brand?: string,
    category?: string
  ): Observable<ProductResponse> {
    const base = `${enviroment.baseUrl}/api/v1/products`;
    let url = `${base}`;
    if (page) {
      url += `?page=${page}`;
    }
    if (brand) {
      url += page ? `&brand=${brand}` : `?brand=${brand}`;
    }
    if (category) {
      url +=
        page || brand
          ? `&category[in]=${category}`
          : `?category[in]=${category}`;
    }
    return this._HttpClient.get<ProductResponse>(url);
  }
  getSpecificProduct(id: string): Observable<{ data: Product }> {
    return this._HttpClient.get<{ data: Product }>(
      `${enviroment.baseUrl}/api/v1/products/${id}`
    );
  }
}
