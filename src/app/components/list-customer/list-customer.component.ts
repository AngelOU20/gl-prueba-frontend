import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Customer } from 'src/app/interfaces/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.css']
})

export class ListCustomerComponent implements AfterViewInit {
  displayedColumns: string[] = ['position', 'name', 'email', 'phoneNumber', 'country', 'isActive', 'actions'];
  dataSource = new MatTableDataSource<Customer>();
  isLoading: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor (private _snackBar: MatSnackBar, private _customerService: CustomerService) { }

  ngOnInit (): void {
    this.getAllCustomers();
  }

  ngAfterViewInit () {
    // pagination
    this.dataSource.paginator = this.paginator;

    if (this.dataSource.data.length > 0) {
      this.paginator._intl.itemsPerPageLabel = "Clientes por página";
      this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
        const startIndex = page * pageSize + 1;
        const endIndex = (page + 1) * pageSize;
        return `${startIndex} - ${endIndex} de ${length}`;
      };
      this.paginator._intl.nextPageLabel = "Siguiente";
      this.paginator._intl.previousPageLabel = "Anterior";
    }

    // sorting
    this.dataSource.sort = this.sort;
  }

  applyFilter (event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getAllCustomers () {
    this.isLoading = true;
    this._customerService.getAllCustomers().subscribe((data) => {
      this.isLoading = false;
      // Agrega el campo 'position' a cada cliente
      this.dataSource.data = data.map((customer, index) => ({
        ...customer,
        position: index + 1
      }));
    });
  }

  deleteCustomer (id: number) {
    this.isLoading = true;

    this._customerService.deleteCustomerById(id).subscribe(() => {
      this.successMessage();
      this.isLoading = false;
      this.getAllCustomers();
    });

  }

  successMessage () {
    this.isLoading = false;
    this._snackBar.open('Cliente eliminado con exito!', '', {
      duration: 4000
    });
  }
}
