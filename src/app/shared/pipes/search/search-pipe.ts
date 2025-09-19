import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../../../features/interfaces/product';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(ProductList: Product[], userWord: string): Product[] {
    return ProductList.filter((prd) =>
      prd.title.toLowerCase().includes(userWord.toLocaleLowerCase())
    );
  }
}
