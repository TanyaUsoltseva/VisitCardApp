import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IProduct } from 'src/app/models/product';
import { FavoritesService } from 'src/app/services/favorites.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit{
  favorites: IProduct[] = [];
  cartSubscription: Subscription;
  constructor(private favoritesService: FavoritesService){

  }

  ngOnInit(): void {
    this.favorites = this.favoritesService.getProducts();
    }
}
