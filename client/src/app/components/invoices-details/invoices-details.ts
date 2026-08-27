import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InvoicesService } from '../../service/invoices-service';
import { CommonModule } from '@angular/common';
import { InvoicesModel } from '../../models/invoices-model';

@Component({
  selector: 'app-invoices-details',
  imports: [CommonModule],
  templateUrl: './invoices-details.html',
  styleUrl: './invoices-details.css'
})
export class InvoicesDetails implements OnInit {

  invoice!: InvoicesModel;

  constructor(
    private route: ActivatedRoute,
    private invoiceService: InvoicesService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      return;
    }

    this.invoiceService.getById(id).subscribe({
      next: (res) => {
        console.log('Invoice:', res);
        this.invoice = res as InvoicesModel;
                this.cdr.detectChanges();

      },
      error: (err) => {
        console.log(err);
      }
    });

  }

}
