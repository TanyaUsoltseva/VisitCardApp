import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IProduct } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { FavoritesService } from 'src/app/services/favorites.service';

@Component({
  selector: 'app-card-product',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.scss']
})
export class CardProductComponent implements OnInit {
  @Input() product: IProduct
  @Input() hideCart = true;
  @Output() sumUpdate = new EventEmitter<IProduct>();
  constructor(
    private cartService: CartService,
    private favoritesService: FavoritesService){

  }

  details = false;
  count = 1;

  addToCart(product: IProduct): void {
    this.cartService.add(product);
  }

  addToFavorites(productsFavorites: IProduct): void {
    productsFavorites.favorite = !productsFavorites.favorite;
    this.favoritesService.add(productsFavorites)
  }

  removeToCart(product: IProduct): void {
    this.cartService.remove(product);
  }

  ngOnInit(): void {

  }

  countProduct(item :boolean) {
    if (!item && this.count === 1) {
      return;
    } else {
      item ? this.count++ : this.count--;
      this.countChange();
    }
  }

  countChange(): void {
    this.product.count = this.count;
    this.product.forAllPrice = this.product.count * this.product.price;
    this.addToCart(this.product);
    this.sumUpdate.emit(this.product);
  }

}
