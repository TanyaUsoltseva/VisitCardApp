import { Component, OnInit, } from '@angular/core';
import { filter } from 'rxjs/operators';
import { IUser } from 'src/app/models/users';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit{
  user: IUser | null;
  cartElements: number;
  constructor(private cartService: CartService,
              private userService: UserService
    ) {

  }
  ngOnInit(): void {
   this.cartService.elements$.subscribe((num) => this.cartElements = num);
   this.userService.user$.subscribe((user) => this.user = user);

  }

}
