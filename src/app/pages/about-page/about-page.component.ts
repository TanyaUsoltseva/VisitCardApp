import { HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { IProduct } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss']
})
export class AboutPageComponent {
  products: IProduct[] = [];
  term = ''

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.productsService.getProducts();
    this.productsService.products$.subscribe((data) => {
      this.products = data
      })

  }
}

