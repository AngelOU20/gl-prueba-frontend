import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Customer } from 'src/app/interfaces/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-detail-customer',
  templateUrl: './detail-customer.component.html',
  styleUrls: ['./detail-customer.component.css']
})
export class DetailCustomerComponent {
  id: number;
  customer!: Customer;
  isLoading: boolean = false;

  constructor (private _customerService: CustomerService, private aRoute: ActivatedRoute) {
    this.id = parseInt(this.aRoute.snapshot.paramMap.get('id')!);

  }

  ngOnInit (): void {
    this.getCustomerById();
  }

  getCustomerById () {
    this.isLoading = true;
    this._customerService.getCustomerById(this.id).subscribe(data => {
      this.isLoading = false;
      this.customer = data;
    });
  }
}
