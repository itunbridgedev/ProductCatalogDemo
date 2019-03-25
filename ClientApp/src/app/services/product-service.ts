import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Configuration } from "../shared/app.config";
import { Product } from '../models/product';
import { HttpHeaders } from '@angular/common/http';


@Injectable()
export class ProductDataService {

    // Use configuration file to get GraphQL api URL
    constructor(private http: HttpClient, private _configuration: Configuration) { }

    

    // node svr url
    private url = this._configuration.webAPIServerUrl;

     // Get All Products
    public getProducts() {     
        return this.http.get(this.url + '/products');
    };

    // Get Products By Product Id
    public getProductByProductId(_ProductId: any) {     
        return this.http.get(this.url + '/products/' + _ProductId);
    };

    // public updateProductBy_ProductId(_Product: Product) {
    //     //console.log("**SVC Update Product ByProductId" + JSON.stringify(_Product));
    //     let body = Object.assign(new Product(), _Product);
    //     return this.http.put(this.url + '/products/', body);
    // };

    public deleteProductByProductId(_ProductId:any){
        return this.http.delete(this.url + '/products/' +_ProductId);
    };

};