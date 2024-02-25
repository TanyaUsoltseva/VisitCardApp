import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../models/product';

@Pipe({
  name: 'categoryFilter'
})
export class CategoryFilterPipe implements PipeTransform {

  transform(products: IProduct[], search: string): IProduct[] {
    return products.filter(p => {
      return typeof p.category === "string" ? p.category.toLowerCase().includes(search.toLowerCase()): 0;
    });
  }

}
