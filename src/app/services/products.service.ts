import { Injectable } from "@angular/core";
import { IProduct } from "../models/product";
import { Observable, Subject } from "rxjs";
import { ProductsRestService } from "./rest-service/products-rest.service";


@Injectable({
  providedIn: 'root'
})

export class ProductsService {
  products$: Subject<IProduct[]> = new Subject();

  constructor(private productsRestService: ProductsRestService){

  }

  getProducts(): void {
    this.productsRestService.getAll().subscribe((data) =>{
      const list = data.map((item) => {
        item.forAllPrice = item.price;
        item.count = 1;
        return item;
      })
      this.products$.next(list)
    })
  }

  getProductById(id: string): Observable<IProduct>{
    return this.productsRestService.getProductById(id);
  }

  createProducts (body: any) {
    return this.productsRestService.createProduct(body)
  }

}
