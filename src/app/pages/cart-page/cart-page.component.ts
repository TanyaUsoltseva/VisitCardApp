import { Component, Input, OnInit } from '@angular/core';
import { products } from 'src/app/data/products';
import { IProduct } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit{
  cart: IProduct[] = [];
  details = false;
  sumOfProducts: number;
  constructor(private cartService: CartService){

  }

  ngOnInit(): void {
    this.cart = this.cartService.getProducts();
    this.cartService.elements$.subscribe(() => this.cart = this.cartService.products) ;
    this.sumUpdate();
  }

  sumUpdate(): void {
    this.sumOfProducts = this.cart.reduce((acc,item) => {
      return acc + item.forAllPrice;
    }, 0)
  }



  submitOrder(): void {

  }

}
