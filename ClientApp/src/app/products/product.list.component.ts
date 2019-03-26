import { Component } from '@angular/core';
import { Product } from '../models/product';
import { ProductDataService } from '../services/product-service';
import { Router } from '@angular/router';

@Component({
  selector: 'products',
  templateUrl: './product.list.component.html',
})
export class ProductListComponent {

  public products: Product[];
  public errorMessage: string;

  constructor(private router: Router, private _productDataService: ProductDataService) {

  }

  ngOnInit() {
    this.buildProductList();
  };

  buildProductList() {
    this._productDataService.getProducts()
      .subscribe(
        (products: Product[]) => {
          this.products = products;
        },
        (error: any) => {
          this.errorMessage = <any>error;
        }
      );
  };
}
