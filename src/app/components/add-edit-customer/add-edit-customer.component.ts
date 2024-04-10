import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/interfaces/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-add-edit-customer',
  templateUrl: './add-edit-customer.component.html',
  styleUrls: ['./add-edit-customer.component.css']
})
export class AddEditCustomerComponent implements OnInit {
  isLoading: boolean = false;
  form: FormGroup;
  id: number;
  operation: string = 'Agregar';

  constructor (
    private _formBuilder: FormBuilder,
    private _customerService: CustomerService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private aRoute: ActivatedRoute,
  ) {
    this.form = this._formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
    });
    this.id = Number(this.aRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit (): void {
    if (this.id != 0) {
      this.operation = 'Editar';
      this.getCustomer(this.id);
    }
  }

  getCustomer (id: number) {
    this.isLoading = true;
    this._customerService.getCustomerById(id).subscribe(data => {
      this.isLoading = false;
      this.form.patchValue({
        name: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber,
        address: data.address,
        city: data.city,
        country: data.country,
        isActive: data.isActive,
      });
    });
  }

  addEditCustomer () {
    const customer: Customer = {
      name: this.form.value.name,
      email: this.form.value.email,
      phoneNumber: this.form.value.phoneNumber,
      address: this.form.value.address,
      city: this.form.value.city,
      country: this.form.value.country,
      isActive: true,
    };

    if (this.id != 0) {
      customer.id = this.id;
      this.editCustomerToBd(this.id, customer);
    } else {
      this.addCustomerToBd(customer);
    }


  }

  addCustomerToBd (customer: Customer) {
    this.isLoading = true;
    this._customerService.createCustomer(customer).subscribe(data => {
      this.isLoading = false;
      this.successMessage('creado');
      this.router.navigate(['/list-customers']);
    });
  }

  editCustomerToBd (id: number, customer: Customer) {
    this.isLoading = true;
    this._customerService.updateCustomer(id, customer).subscribe(() => {
      this.isLoading = false;
      this.successMessage('actualizado');
      this.router.navigate(['/list-customers']);
    });
  }

  successMessage (text: string) {
    this.isLoading = false;
    this._snackBar.open(`Cliente fue ${text} con exito!`, '', {
      duration: 4000
    });
  }
}
