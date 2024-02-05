
import { Injectable } from "@angular/core";
import { Observable, catchError, retry, throwError } from "rxjs";
import { IProduct } from "src/app/models/product";
import { ErrorService } from "../error.service";
import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";



@Injectable({
  providedIn: 'root'
})

export class ProductsRestService {
  constructor(
     private http: HttpClient,
     private errorService: ErrorService
    ){
  }
  getAll(): Observable<IProduct[]> {
   return this.http.get<IProduct[]>('https://fakestoreapi.com/products', {
    params : new HttpParams(). append('limit', 10)
   }).pipe(
    retry(2),
    catchError(this.errorHandler.bind(this))
   )
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message)
    return throwError(() => error.message)

  }
}
