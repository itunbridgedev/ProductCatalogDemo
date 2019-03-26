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
    private products: Product[];

    public getProducts() {
        if (this.products) {
            return of(this.products);
        }     
        return this.http.get<Product[]>(this.url + '/products')
            .pipe(
                tap(data => this.products = data),
                catchError(this.handleError<Product[]>('getProducts'))
            );
    };

    public getProduct(id: any) { 
        if (this.products) {
            const foundItem = this.products.find(item => item.ProductId === id);
            if (foundItem) {
                return of(foundItem);
            }
        }
        return this.http.get(`${this.url}'/products/{id}`)
            .pipe(
                tap(data => console.log('Data:' + JSON.stringify(data))),
                catchError(this.handleError<Product>('getProduct(id)'))
            );
    };

    public addProduct(product: Product): Observable<Product>{
        return this.http.post<Product>(this.url + '/products', product)
            .pipe(
                tap((newProduct: Product) => console.log(`added product w/ id=${newProduct.ProductId}`)),
                tap(data => {
                    this.products.push(data);
                }),
                catchError(this.handleError<Product>('addProduct')
            )
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