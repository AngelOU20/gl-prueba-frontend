import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Customer } from '../interfaces/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private myAppUrl: string = environment.endpoint;
  private myApiUrl: string = 'api/Customer/';

  constructor (private http: HttpClient) { }

  getAllCustomers (): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.myAppUrl}${this.myApiUrl}get-all-customers`);
  }

  getCustomerById (id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  deleteCustomerById (id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}delete-customer/${id}`);
  }

  createCustomer (customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${this.myAppUrl}${this.myApiUrl}create-customer`, customer);
  }

  updateCustomer (id: number, customer: Customer): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}update-customer/${id}`, customer);
  }
}