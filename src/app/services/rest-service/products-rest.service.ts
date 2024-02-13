
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
   return this.http.get<IProduct[]>('http://localhost:3000/products/');
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message)
    return throwError(() => error.message)

  }

  getProductById(id: string): Observable<IProduct> {
    return this.http.get<IProduct>("http://localhost:3000/product-page/"+id);
  }


  // initProduct(): Observable<IProduct[]> {
  //   return this.http.post<IProduct[]>("http://localhost:3000/product-page/", {});
  // }

  deleteProduct(): Observable<Object>{
    return this.http.delete("http://localhost:3000/product-page/");
  }

  createProduct(body: any): Observable<any> {
    return this.http.post("http://localhost:3000/product-item/", body)
  }
}
