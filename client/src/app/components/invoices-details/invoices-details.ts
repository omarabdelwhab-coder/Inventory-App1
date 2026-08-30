import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InvoicesService } from '../../service/invoices-service';
import { CommonModule } from '@angular/common';
import { InvoicesModel } from '../../models/invoices-model';
import { Client } from '../../service/client';
import { ClientsModel } from '../../models/clients.model';

@Component({
  selector: 'app-invoices-details',
  imports: [CommonModule],
  templateUrl: './invoices-details.html',
  styleUrl: './invoices-details.css'
})
export class InvoicesDetails implements OnInit {

  invoice!: InvoicesModel;
  client: ClientsModel|null =null

  constructor(
    private route: ActivatedRoute,
    private invoiceService: InvoicesService,
    private cdr: ChangeDetectorRef,
    private clienServer: Client
  ) { }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      return;
    }

    this.invoiceService.getById(id).subscribe({
      next: (res:any) => {
        console.log('Invoice:', res);
        this.invoice = res ;
        this.cdr.detectChanges();
        if ((this.invoice ).clientName) {

          this.clienServer.findByName(this.invoice.clientName).subscribe({

            next: (client:any) => {

              console.log('Client:', client);

              this.client = client;

              this.cdr.detectChanges();

            },

            error: (err) => {
              console.log('Client error:', err);
              this.client = null;
            }

          });

        } else {

          this.client = null;

        }


      },
      error: (err) => {
        console.log(err);
      }
    });

  }

}
