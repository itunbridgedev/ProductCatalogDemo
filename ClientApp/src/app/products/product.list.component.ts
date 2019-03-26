import { Component } from '@angular/core';
import { Product } from '../models/product';
import { ProductDataService } from '../services/product-service';
import { Router } from '@angular/router';

@Component({
  selector: 'products',
  templateUrl: './product.list.component.html',
})
export class ProductListComponent {

  public _products: any;
  public toggleProductList = false;

  constructor(private router: Router, private _productDataService: ProductDataService) {

  }

  ngOnInit() {
    this.buildProductList();
  };

  buildProductList() {
    this._productDataService.getProducts()
      .subscribe(
        (results: any[]) => {
          console.log('**Result' + JSON.stringify(results))
          if (results == undefined || results.length == 0) {
            this.toggleProductList = false;
            return;
          };
          this.toggleProductList = true;
          this._products = results;
        },
        error => {
          console.log("***ERROR: " + error);
        }
      );
  };
}
