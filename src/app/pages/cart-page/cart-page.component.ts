import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IOrder } from 'src/app/models/order';
import { IProduct } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductsRestService } from 'src/app/services/rest-service/products-rest.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit{
  cart: IProduct[] = [];
  order: IOrder | null;
  details = false;
  sumOfProducts: number;
  name: string;
  address: string;
  telephone: number;
  mail: string;
  message: string;
  selectedValue = false;
  orderForm: FormGroup
  constructor(private cartService: CartService,
              private orderService: OrderService,
              private userService: UserService,
              private productRestService: ProductsRestService,
    ){

  }

  ngOnInit(): void {
    this.cart = this.cartService.getProducts();
    this.cartService.elements$.subscribe(() => this.cart = this.cartService.products) ;
    this.sumUpdate();

    this.orderForm = new FormGroup( {
      name: new FormControl('', ),
      address: new FormControl('', ),
      telephone: new FormControl(),
      mail: new FormControl(),
      message: new FormControl()
    });
  }

  sumUpdate(): void {
    this.sumOfProducts = this.cart.reduce((acc,item) => {
      return acc + item.forAllPrice;
    }, 0)
  }



  submitOrder(): void  {
    const orderDataRow = this.orderForm.getRawValue();
    console.log('***', orderDataRow);
    const postData = this.cart.map((item) => {
      return {count: item.count, _id: item._id };
    });

    const userId = this.userService.user$.getValue()?.id || null;

    // let formParams = new FormData();
    // if(typeof orderDataRow === "object") {
    //   for (let prop in orderDataRow) {
    //     formParams.append(prop, orderDataRow[prop]);
    //   }
    // }

    const postObj: IOrder = {
      ...orderDataRow,
      ...{userId},
      ...{productId:postData},
    }
    debugger
    this.orderService.createOrder(postObj).subscribe();

  }

  clearCart(): void {
    // this.cart = [];
    // this.sumUpdate();
    this.cartService.updateCart();
  }
}
