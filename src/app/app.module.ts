import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Modules
import { SharedModule } from './shared/shared.module';

// Components
import { AddEditCustomerComponent } from './components/add-edit-customer/add-edit-customer.component';
import { ListCustomerComponent } from './components/list-customer/list-customer.component';
import { DetailCustomerComponent } from './components/detail-customer/detail-customer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    AddEditCustomerComponent,
    ListCustomerComponent,
    DetailCustomerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
