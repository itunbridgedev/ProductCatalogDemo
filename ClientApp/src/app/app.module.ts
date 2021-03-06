import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { ProductDataService } from './services/product-service'
import { ProductListComponent } from './products/product.list.component';
import { ProductDetailComponent } from './products/product.detail.component';
import { ProductCreateComponent } from './products/product.create.component';
import { Configuration } from './shared/app.config';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    ProductListComponent,
    ProductDetailComponent,
    ProductCreateComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'products', component: ProductListComponent },
      { path: 'products/new', component: ProductCreateComponent },
      { path: 'products/:id', component: ProductDetailComponent }
      
    ])
  ],
  providers: [ ProductDataService, Configuration ],
  bootstrap: [AppComponent]
})
export class AppModule { }
