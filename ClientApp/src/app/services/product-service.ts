import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Configuration } from "../shared/app.config";
import { Product } from '../models/product';
import { HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable()
export class ProductDataService {

    // Use configuration file to get GraphQL api URL
    constructor(private http: HttpClient, private _configuration: Configuration) { }    

    private url = this._configuration.webAPIServerUrl;

     // Get All Products
    public getProducts() {     
        return this.http.get(this.url + '/products');
    };

    // Get Products By Product Id
    public getProductByProductId(_ProductId: any) {     
        return this.http.get(this.url + '/products/' + _ProductId);
    };

    public addProduct(product: Product): Observable<Product>{
        return this.http.post<Product>(this.url + '/products', product).pipe(
            tap((newProduct: Product) => console.log(`added product w/ id=${newProduct.ProductId}`)),
            catchError(this.handleError<Product>('addProduct'))
        );
    }

    public deleteProductByProductId(_ProductId:any){
        return this.http.delete(this.url + '/products/' +_ProductId);
    };

    private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
     
          // TODO: send the error to remote logging infrastructure
          console.error(error); // log to console instead
     
          // TODO: better job of transforming error for user consumption
          console.log(`${operation} failed: ${error.message}`);
     
          // Let the app keep running by returning an empty result.
          return of(result as T);
        };
      }

};