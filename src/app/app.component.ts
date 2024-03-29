import { Component, OnInit } from '@angular/core';
import { ProductsService } from './services/products.service';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MessageService]
})
export class AppComponent implements OnInit {
  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.productsService.getProducts();
  }
}
