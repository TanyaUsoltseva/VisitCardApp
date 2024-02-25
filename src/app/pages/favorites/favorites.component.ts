import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IProduct } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { FavoritesService } from 'src/app/services/favorites.service';
import { ProductsRestService } from 'src/app/services/rest-service/products-rest.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit{
  @Input() product: IProduct;
  favorites: IProduct[] = [];
  cartSubscription: Subscription;
  constructor(
    private favoritesService: FavoritesService,
    private cartService: CartService,
    private productsRestService: ProductsRestService,
              ){

  }

  addToCart(product: IProduct): void {
    this.cartService.add(product);
  }


  removeToCard(favorites: IProduct): void {
    this.favoritesService.remove(favorites);

  }

  ngOnInit(): void {
    this.favorites = this.favoritesService.getProducts();
    this.productsRestService.getAllFavorites().subscribe((data) => {
      console.log(data)
    })
    this.favoritesService.elements$.subscribe(() => this.favorites = this.favoritesService.productsFavorites) ;

    }

  isExist(product: IProduct): boolean {
    return !!this.cartService.products.find((item) => item._id === product._id)
  }
}
