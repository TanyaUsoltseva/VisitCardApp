import { Injectable } from '@angular/core';
import { ProductsRestService } from './rest-service/products-rest.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { IOrder } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  order$ = new BehaviorSubject<IOrder | null>(null);

  constructor( private productsRestService: ProductsRestService) { }

  createOrder (data: IOrder): Observable<IOrder> {
    return this.productsRestService.createOrder(data);
  }

  setOrder(order: IOrder): void {
    this.order$.next(order);
  };
}
