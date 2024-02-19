import { Injectable } from '@angular/core';
import { IProduct } from '../models/product';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  products: IProduct[] = [];
  elements$: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor() { }

  add(product: IProduct) {
    const values = this.products.find((item) => item._id === product._id)

    if(values){
      values.count = product.count;
    } else {
      this.products.push(product);
    }
      this.elements$.next(this.products.length);

      this.prepareToStorage();

  }

  remove(product: IProduct) {
    this.products = this.products.filter((item) => item._id !== product._id);
    this.elements$.next(this.products.length);
    this.prepareToStorage();
  }

  prepareToStorage() {
    let string = JSON.stringify(this.products);
    localStorage.setItem("products", string);
    console.log(this.products);
  }

  getProducts(): IProduct[] {
    const data = localStorage.getItem("products");
    if (data?.length){
      this.products = JSON.parse(data).map((item: IProduct) => {

        if (!item.forAllPrice) item.forAllPrice = item.price;
        if (!item.count) {
          item.count = 1;
        }
        return item;
      })
      this.elements$.next(this.products.length);
      return this.products;
    } else {
      return [];
    }
  }

  updateCart(): void {
    this.products = [];
    this.elements$.next(this.products.length);
    localStorage.removeItem('products');
   }
}
