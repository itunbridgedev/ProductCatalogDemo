import { Component } from '@angular/core';
import { Product } from '../models/product';
import { ProductDataService } from '../services/product-service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'product-create',
  templateUrl: './product.create.component.html',
})
export class ProductCreateComponent {
  public errorMessage: string = "";

  constructor(
    private router: Router,
    private _productDataService: ProductDataService,
    private location: Location) { }

  ngOnInit() {
    
  };

  addProduct(
    name: string,
    description: string,
    quantity: number
  ): void {
    this._productDataService.addProduct(
        { 
          Name: name, 
          Description: description, 
          Quantity: quantity 
        } as Product)
      .subscribe((product: Product) => { 
        this.router.navigateByUrl('/products');
      },
        error => {
          this.errorMessage = error;
        }
      );
  };

  goBack(): void {
    this.location.back();
  }
}
