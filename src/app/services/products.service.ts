import { Injectable } from "@angular/core";
import { IProduct } from "../models/product";
import { Subject } from "rxjs";
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
      this.products$.next(data)
    })
  }

}
