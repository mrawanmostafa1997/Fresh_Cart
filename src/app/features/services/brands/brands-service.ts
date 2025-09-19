import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../../enviroment/enviroment';
import { Brand, BrandsResponse } from '../../interfaces/brands';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BrandsService {
  constructor(private _HttpClient: HttpClient) {}
  getAllBrands(): Observable<BrandsResponse> {
    return this._HttpClient.get<BrandsResponse>(
      `${enviroment.baseUrl}/api/v1/brands`
    );
  }
  getBrandById(id: string): Observable<{ data: Brand }> {
    return this._HttpClient.get<{ data: any }>(
      `${enviroment.baseUrl}/api/v1/brands/${id}`
    );
  }
}
