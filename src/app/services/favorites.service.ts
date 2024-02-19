import { Injectable } from '@angular/core';
import { IProduct } from '../models/product';
import { BehaviorSubject } from 'rxjs';
import { IUser } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  productsFavorites: IProduct[] = [];
  user$ = new BehaviorSubject<IUser | null>(null);
  elements$: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor() { }

  add(productsFavorites: IProduct,) {
    if (this.productsFavorites.find((item) => item._id === productsFavorites._id)){
      this.remove(productsFavorites)
    } else {
      this.productsFavorites.push(productsFavorites);
      this.elements$.next(this.productsFavorites.length);
      this.prepareToStorage();
    }
  }





  remove(productsFavorites: IProduct) {
    this.productsFavorites = this.productsFavorites.filter((item) => item._id !== productsFavorites._id);
    this.elements$.next(this.productsFavorites.length);
    this.prepareToStorage();
  }

  prepareToStorage() {
    let string = JSON.stringify(this.productsFavorites);
    localStorage.setItem("productsFavorites", string);
    console.log(this.productsFavorites);
  }

  getProducts(): IProduct[] {
    const data = localStorage.getItem("productsFavorites");
    if (data?.length){
      this.productsFavorites = JSON.parse(data);
      this.elements$.next(this.productsFavorites.length);
      return this.productsFavorites;
    } else {
      return [];
    }
  }
}



