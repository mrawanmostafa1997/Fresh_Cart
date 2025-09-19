import { Component } from '@angular/core';
import { OwlOptions, CarouselModule } from 'ngx-owl-carousel-o';
import { ProductService } from '../../../../../services/product/product-service';
import { Product } from '../../../../../interfaces/product';
import { Productcard } from '../../../../../../shared/components/productcard/productcard';

@Component({
  selector: 'app-homeslider',
  imports: [CarouselModule],

  templateUrl: './homeslider.html',
  styleUrl: './homeslider.scss',
})
export class Homeslider {
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplaySpeed: 1,

    autoplay: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
    },
    nav: true,
  };
}
