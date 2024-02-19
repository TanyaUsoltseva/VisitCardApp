import { Injectable } from '@angular/core';
import { StorageService } from '../storage.service';
import { IUser } from 'src/app/models/users';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject: BehaviorSubject<IUser | null>;
  public user: Observable<IUser | null>;


  private usersStorage: IUser[] = [];

  constructor(private storageService: StorageService,
              private router: Router )  {
    this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
    this.user = this.userSubject.asObservable();
   }

   public get userValue() {
    return this.userSubject.value;
  }

  // checkUser(user: IUser) {

  //     const  isUserExists = this.usersStorage.find((el) => el.login === user.login);

  //     let isUserSavedInStore = localStorage.getItem('users');
  //     let userInStore: IUser = <IUser>{} ;

  //     if (isUserSavedInStore) {
  //       userInStore = JSON.parse(isUserSavedInStore);
  //     }

  //     if (isUserExists) {
  //       return isUserExists.psw === user.psw;
  //     }else if (userInStore) {
  //       return userInStore.psw === user.psw;
  //     }
  //     return false;
  // }

  setUser(user: IUser, isUserSave: boolean): void {
    if (isUserSave) {
      this.addToStorage(user);
      this.userSubject.next(user);
    }
    if (!this.isUserExists(user) && user?.login) {
      this.usersStorage.push(user);
    }
  }

  isUserExists(user: IUser): boolean {
    const  isUserExists = this.usersStorage.find((el) => el.login === user.login);

    return !!isUserExists;
  }

  addToStorage(user: IUser): void {
    this.storageService.setToStorage('users', user);
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    this.userSubject.next(null);
    // this.router.navigate(['/login']);
    localStorage.clear()

}


}
