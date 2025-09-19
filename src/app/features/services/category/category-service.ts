import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { enviroment } from '../../../enviroment/enviroment';
import { Observable } from 'rxjs';
import { Category, CategoryResponse } from '../../interfaces/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private _HttpClient: HttpClient) {}
  getAllCategories(): Observable<CategoryResponse> {
    return this._HttpClient.get<CategoryResponse>(
      `${enviroment.baseUrl}/api/v1/categories`
    );
  }
  getCategoryById(id: string): Observable<{ data: Category }> {
    return this._HttpClient.get<{ data: any }>(
      `${enviroment.baseUrl}/api/v1/categories/${id}`
    );
  }
}
