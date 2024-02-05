import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IProduct } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit{
  cart: IProduct[] = [];
  cartSubscription: Subscription;
  details = false
  constructor(private cartService: CartService){

  }

  ngOnInit(): void {
    this.cart = this.cartService.getProducts();
    }
}
