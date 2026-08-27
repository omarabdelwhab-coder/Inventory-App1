import { ChangeDetectorRef, Component } from '@angular/core';
import { InvoicesModel } from '../../models/invoices-model';
import { InvoicesService } from '../../service/invoices-service';
import { RouterLink } from '@angular/router';
import { Vault } from '../vault/vault';

@Component({
  selector: 'app-invoives-list',
  imports: [RouterLink,Vault],
  templateUrl: './invoives-list.html',
  styleUrl: './invoives-list.css',
})
export class InvoivesList {
  invoices:InvoicesModel[] =[]
  constructor(private innoicesService:InvoicesService,private cdr: ChangeDetectorRef){}
  ngOnInit(){
    this.innoicesService.getAllInvices().subscribe((res:any)=>{this.invoices=res
              this.cdr.detectChanges();

    },error=>console.log(error)


    )
  }
}
