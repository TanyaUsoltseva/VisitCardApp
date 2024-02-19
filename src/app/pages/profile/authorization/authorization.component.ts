import {Component, OnInit} from '@angular/core';
import {IUser} from "../../../models/users";
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ServerError } from 'src/app/models/error';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})

export class AuthorizationComponent implements OnInit {
  loginText='Логин';
  pswText = 'Пароль';
  psw: string;
  login: string;
  selectedValue: boolean;
  cardNumber: string;
  authTextButton: string;
  private activeRoute: string;

  constructor(
    private  authService: AuthService,
     private messageService: MessageService,
     private router: Router,
     private route: ActivatedRoute,
     private userService: UserService,
     private http: HttpClient,
     ) { }

  ngOnInit(): void {
    this.authTextButton = "Авторизоваться";
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.activeRoute = event.url;
      }
    });
  }

  onAuth(ev: Event): void {
      const authUser: IUser = {
        psw : this.psw,
        login: this.login,
      }

      this.http.post<{access_token: string, id: string}>('http://localhost:3000/users/'+authUser.login, authUser).subscribe((data : {access_token: string, id: string}) => {
      authUser.id = data.id;
      this.userService.setUser(authUser);
      this.authService.setUser(authUser, true)
      const token: string = data.access_token;
      this.userService.setToken(token);
      this.userService.setToStore(token);
      this.router.navigate(['/']);
    }, (err: HttpErrorResponse)=> {
      const serverError =<ServerError>err.error;
      this.messageService.add({severity:'warn', summary:serverError.errorText});
    });
  }

}
