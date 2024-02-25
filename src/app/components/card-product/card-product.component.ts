import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { IProduct } from 'src/app/models/product';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { FavoritesService } from 'src/app/services/favorites.service';

@Component({
  selector: 'app-card-product',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.scss']
})
export class CardProductComponent implements OnInit {
  @Input() product: IProduct;
  @Input() hideCart = true;
  @Output() sumUpdate = new EventEmitter<IProduct>();
  constructor(
    private cartService: CartService,
    private favoritesService: FavoritesService,
    private authService: AuthService,
    private messageService: MessageService
    ){

  }

  details = false;

  addToCart(product: IProduct): void {
    this.cartService.add(product);
  }

  addToFavorites(productsFavorites: IProduct): void {

    if (this.authService.userValue) {
      productsFavorites.favorite = !productsFavorites.favorite;
      this.favoritesService.add(productsFavorites)
    } else {
      this.messageService.add({severity:'error', summary:'Для добавления в избранное необходимо авторизоваться!'});
    }
  }

  removeFromCart(product: IProduct): void {
    this.cartService.remove(product);
  }

  isExist(product: IProduct): boolean {
    return !!this.cartService.products.find((item) => item._id === product._id)
  }

  ngOnInit(): void {
  }

  countProduct(item :boolean, product: IProduct) {
    if (!item && this.product.count === 1) {
      return;
    } else {
      item ? product.count++ : product.count--;
      this.countChange(product);
    }
  }

  countChange(product: IProduct): void {
    this.product.forAllPrice = product.count * product.price;
    this.addToCart(this.product);
    this.sumUpdate.emit(this.product);
  }


}
