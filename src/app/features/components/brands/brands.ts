import { Component } from '@angular/core';
import { BrandsService } from '../../services/brands/brands-service';
import { Brand } from './../../interfaces/brands';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-brands',
  imports: [DatePipe],
  templateUrl: './brands.html',
  styleUrl: './brands.scss',
})
export class Brands {
  BrandsList!: Brand[];
  constructor(private _BrandsService: BrandsService, private _Router: Router) {
    this._BrandsService.getAllBrands().subscribe({
      next: (res) => {
        this.BrandsList = res.data;
      },
      error: (err) => {},
      complete: () => {},
    });
  }
  selectBrand(brandId: string) {
    this._BrandsService.getBrandById(brandId).subscribe({
      next: (res) => {
        this._Router.navigate(['/products'], {
          queryParams: { brand: brandId },
          queryParamsHandling: 'merge',
        });
        console.log(res.data);
      },
      error: (err) => {},
      complete: () => {},
    });
  }
}
