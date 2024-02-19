import { Component, OnInit } from '@angular/core';
import { Observable, from, tap } from 'rxjs';
import { IProduct } from 'src/app/models/product';
import { ProductsRestService } from 'src/app/services/rest-service/products-rest.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent {
  title = 'VisitCardApp';
  loading = false
  products$: Observable<IProduct[]>;
  term = ''

  constructor(private productsRestService: ProductsRestService){

  }


  ngOnInit(): void {
    this.loading = true
    this.products$ = this.productsRestService.getAll().pipe(
      tap(() => this.loading = false)
    )
  }


}

