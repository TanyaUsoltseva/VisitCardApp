import { Injectable } from '@angular/core';
import { IUser } from 'src/app/models/users';
import { StorageService } from './storage.service';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user$ = new BehaviorSubject<IUser | null>(null);


  private token: string;

  constructor( private storageService: StorageService) { }


  setUser(user: IUser): void {
    this.user$.next(user);
  };

  setToken(token: string): void {
    this.token = token;
  }

  setToStore(token: string) {
    this.storageService.setToStorage('token', token)
  }

  getToken(): string {
    return this.token;
  }



}
