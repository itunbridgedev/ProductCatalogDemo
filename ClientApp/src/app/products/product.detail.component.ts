import { Component } from '@angular/core';
import { Product } from '../models/product';
import { ProductDataService } from '../services/product-service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'product-details',
  templateUrl: './product.detail.component.html',
})
export class ProductDetailComponent {

  public product: Product;

  constructor(
    private route: ActivatedRoute,
    private _productDataService: ProductDataService,
    private location: Location) { }

  ngOnInit() {
    this.getProductDetail();
  };

  getProductDetail(): void {
    const id = + this.route.snapshot.paramMap.get('id');
    this._productDataService.getProductByProductId(id)
      .subscribe((product: Product) => { 
        this.product = product; 
      },
        error => {
          console.log("***ERROR: " + error);
        }
      );
  };

  goBack(): void {
    this.location.back();
  }
}
