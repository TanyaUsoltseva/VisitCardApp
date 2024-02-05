import { Component, Input } from '@angular/core';
import { IProduct } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { FavoritesService } from 'src/app/services/favorites.service';

@Component({
  selector: 'app-card-product',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.scss']
})
export class CardProductComponent {
  @Input() product: IProduct

  constructor(
    private cartService: CartService,
    private favoritesService: FavoritesService){

  }

  details = false

  addToCart(product: IProduct): void {
    this.cartService.add(product)
  }

  addToFavorites(productsFavorites: IProduct): void {
    productsFavorites.favorite = !productsFavorites.favorite;
    this.favoritesService.add(productsFavorites)
  }

  removeToCart(product: IProduct): void {
    this.cartService.remove(product)
  }
}
