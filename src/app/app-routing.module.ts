import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { ListCustomerComponent } from './components/list-customer/list-customer.component';
import { AddEditCustomerComponent } from './components/add-edit-customer/add-edit-customer.component';
import { DetailCustomerComponent } from './components/detail-customer/detail-customer.component';

const routes: Routes = [
  { path: '', redirectTo: 'list-customers', pathMatch: 'full' },
  {
    path: 'list-customers', component: ListCustomerComponent
  },
  {
    path: 'add-customer', component: AddEditCustomerComponent
  },
  {
    path: 'view-detail-customer/:id', component: DetailCustomerComponent
  },
  {
    path: 'edit-customer/:id', component: AddEditCustomerComponent
  },
  {
    path: '**', redirectTo: 'list-customers', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
