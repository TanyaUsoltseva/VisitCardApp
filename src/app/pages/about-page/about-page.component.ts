
import { Component } from '@angular/core';
import { IProduct } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { FavoritesService } from 'src/app/services/favorites.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss']
})
export class AboutPageComponent {
  products: IProduct[] = [];
  term = ''
  responsiveOptions: any[] = [
    {
        breakpoint: '1199px',
        numVisible: 5,
        numScroll: 1
    },
    {
        breakpoint: '1025px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1
    }
];

  constructor(private productsService: ProductsService,
              private cartService: CartService,
              private favoritesService: FavoritesService
              ) {}

  ngOnInit(): void {
    this.productsService.getProducts();
    this.productsService.products$.subscribe((data) => {
      this.products = data
      })
  }


  getSeverity(status: string) {
    switch (status) {
        case 'INSTOCK':
            return 'success';
        case 'LOWSTOCK':
            return 'warning';
        case 'OUTOFSTOCK':
            return 'danger';
        default:
          console.log("sfdf")
          return 'default';
          break;

    }

}

addToCart(product: IProduct) {
  this.cartService.add(product);
}

isExist(product: IProduct): boolean {
  return !!this.cartService.products.find((item) => item._id === product._id);
}

addToFavorites(product: IProduct) {
  this.favoritesService.add(product);
}

}

