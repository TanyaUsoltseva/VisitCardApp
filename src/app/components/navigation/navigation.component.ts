import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, OnChanges{
  cartElements: number;
  constructor(private cartService: CartService) {

  }
  ngOnInit(): void {
   this.cartService.elements$.subscribe((num) => this.cartElements = num);
  }

  ngOnChanges(changes: SimpleChanges): void {

  }


}
