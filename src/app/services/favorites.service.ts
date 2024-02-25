import { Injectable } from '@angular/core';
import { IProduct } from '../models/product';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUser } from '../models/users';
import { IFavorite } from '../models/favorites';
import { ProductsRestService } from './rest-service/products-rest.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  productsFavorites: IProduct[] = [];
  user$ = new BehaviorSubject<IUser | null>(null);
  elements$: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor(private productsRestService: ProductsRestService,
              private userService: UserService
    ) { }

  add(productsFavorites: IProduct,) {
    if (this.productsFavorites.find((item) => item._id === productsFavorites._id)){
      this.remove(productsFavorites)
    } else {
      productsFavorites.userId = this.userService.user$.getValue()?.id;
      this.productsFavorites.push(productsFavorites);
      this.elements$.next(this.productsFavorites.length);
      this.prepareToStorage();
      this.transferFavoritesToServer();
    }
  }
  transferFavoritesToServer() {
    const favoritesString = localStorage.getItem('productsFavorites');

    if (favoritesString) {
      const favorites = JSON.parse(favoritesString);

      this.productsRestService.transferFavoritesToServer(favorites).subscribe({
        next: (data) => {
          console.log('success', data)
        },
        error: (err) => {
          console.log('fail', err)
        }
      });
    } else {
      console.error('Favorites not found in localStorage');
    }
  }





  remove(productsFavorites: IProduct) {
    this.productsFavorites = this.productsFavorites.filter((item) => item._id !== productsFavorites._id);
    this.elements$.next(this.productsFavorites.length);
    this.prepareToStorage();

    this.productsRestService.deleteFavoritesProduct(productsFavorites._id).subscribe({
      next: (data) =>{
        console.log('Product successfully deleted from favorites:', data)
      },
      error: (err) => {
        console.log("f", err)
      }
      });


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

  updateCart(): void {
    this.productsFavorites = [];
    this.elements$.next(this.productsFavorites.length);
    localStorage.removeItem('productsFavorites');
   }

  //  getFavoritesById(_id: string): Observable<IFavorite>{
  //   return this.productsRestService.getFavoritesById(_id);
  // }


}



