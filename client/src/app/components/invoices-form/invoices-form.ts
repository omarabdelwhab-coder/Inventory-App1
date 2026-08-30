import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule
} from '@angular/forms';
import { InvoicesService } from '../../service/invoices-service';
import { ProductService } from '../../service/product-service';
import { Router } from '@angular/router';
import { Client } from '../../service/client';

@Component({
  selector: 'app-invoices-form',
  imports: [ReactiveFormsModule],
  templateUrl: './invoices-form.html',
  styleUrl: './invoices-form.css',
})
export class InvoicesForm implements OnInit {

  invoiceForm!: FormGroup;
  products: any[] = [];
clients: any[] = [];
filteredClients: any[] = [];

  constructor(
    private fb: FormBuilder,
    private invoiceService: InvoicesService,
    private productService: ProductService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private clientService: Client

  ) { }

  ngOnInit() {

    this.invoiceForm = this.fb.group({
      clientName: [''],
      expenseName: [''],
      expenseAmount: [0],
      invType: ['SALE'],
      paidAmount:[0],
      payOldBalance: [false],




      items: this.fb.array([])
    });
    this.clientService.getAllClients().subscribe({
      next: (res: any) => {
        this.clients = res;
         this.filteredClients = res;


        this.cdr.detectChanges();

      },
      error: (err) => {
        console.log(err);
      }
    });


    this.productService.getAllPoducts().subscribe({
      next: (res: any) => {
        this.products = res;

        this.cdr.detectChanges();

      },
      error: (err) => {
        console.log(err);
      }
    });

    this.addItem();
  }
  filterClients(value: string) {
  const search = value.trim().toLowerCase();

  this.filteredClients = this.clients.filter((client) =>
    client.clientName.toLowerCase().includes(search)
  );
}


  get items(): FormArray {
    return this.invoiceForm.get('items') as FormArray;
  }

  addItem() {

    this.items.push(
      this.fb.group({
        productId: [''],
        productName: [''],
        quantity: [1],
        unitCost: [0],
        maxQuantity:[0],
        discount: [0]
      })
    );

  }

  removeItem(index: number) {
    this.items.removeAt(index);
  }

  selectProduct(index: number) {

    const item = this.items.at(index);

     const productId = item.get('productId')?.value;

    const product = this.products.find(
      p => p._id === productId
    );

    if (product) {

      item.patchValue({
        productName: product.productName,
        unitCost: product.unitCost,
        maxQuantity:product.quantity

      });

    }

  }

  onSubmit() {

    if (!this.invoiceForm.valid) {
      return;
    }

    const formValue = this.invoiceForm.value;

    let data;

    if (formValue.invType === 'EXPENSE') {

      data = {
        expenseName: formValue.expenseName,
        expenseAmount: formValue.expenseAmount,
        invType: 'EXPENSE',
        items: []
      };

    }

    else {



      const payOldBalance = formValue.payOldBalance;

 data = {
  clientName: formValue.clientName,
  invType: 'SALE',
  paidAmount: Number(formValue.paidAmount || 0),
  items: payOldBalance ? [] : formValue.items
};


    }

    console.log('Sending:', data);

    this.invoiceService.addInvoices(data).subscribe({

      next: (res: any) => {

        console.log('Invoice:', res);

        if (res._id) {

          this.router.navigate([
            '/invoicesdetails',
            res._id
          ]);

        }

      },

      error: (err) => {
        console.log('Error:', err);
      }

    });

  }
}
