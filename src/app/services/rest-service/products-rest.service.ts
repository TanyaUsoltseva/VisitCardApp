
import { Injectable } from "@angular/core";
import { Observable, map, retry, throwError } from "rxjs";
import { IProduct } from "src/app/models/product";
import { ErrorService } from "../error.service";
import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { IOrder } from "src/app/models/order";
import { IFavorite } from "src/app/models/favorites";



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
   return this.http.get<IProduct[]>('http://localhost:3000/products/');
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message)
    return throwError(() => error.message)

  }

  getProductById(id: string): Observable<IProduct> {
    return this.http.get<IProduct>("http://localhost:3000/product-page/"+id);
  }


  deleteProduct(): Observable<Object>{
    return this.http.delete("http://localhost:3000/product-page/");
  }

  createProduct(body: any): Observable<any> {
    return this.http.post("http://localhost:3000/product-item/", body)
  }


  createOrder(data: IOrder): Observable<any> {
    return this.http.post<{id: string}>("http://localhost:3000/order/", data);
  }

  deleteCartProduct(): Observable<Object>{
    return this.http.delete("http://localhost:3000/order/");
  }

  // getFavoritesById(_id: string): Observable<IProduct> {
  //   return this.http.get<IProduct>("http://localhost:3000/favorites/"+_id);
  // }

  transferFavoritesToServer(favorites: IProduct[]): Observable<any> {
    return this.http.post("http://localhost:3000/favorites/", favorites)
  }

  getAllFavorites(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>('http://localhost:3000/favorites/');
   }

   deleteFavoritesProduct(_id: string): Observable<any>{
    return this.http.delete("http://localhost:3000/favorites/" +_id);
  }

  deleteAllFavorites(): Observable<any>{
    return this.http.delete("http://localhost:3000/favorites/");
  }
}


