import { ChangeDetectorRef, Component } from '@angular/core';
import { InvoicesModel } from '../../models/invoices-model';
import { InvoicesService } from '../../service/invoices-service';
import { RouterLink } from '@angular/router';
import { Vault } from '../vault/vault';
import { InvoicesSearch } from '../invoices-search/invoices-search';
import { InvoicesSearchnum } from '../invoices-searchnum/invoices-searchnum';

@Component({
  selector: 'app-invoives-list',
  imports: [RouterLink,Vault,InvoicesSearch,InvoicesSearchnum],
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
  onSearchName(name: string) {
  const value = name.trim();

  if (!value) {
    this.innoicesService.getAllInvices().subscribe((res: any) => {
      this.invoices = res;
      this.cdr.detectChanges();
    });
    return;
  }

  this.innoicesService.searchByName(value).subscribe(
    (res: any) => {
      this.invoices = res;
      this.cdr.detectChanges();
    },
    (error) => console.log(error)
  );
}

onSearchnum(num: string) {
  const value = num.trim();

  if (!value) {
    this.innoicesService.getAllInvices().subscribe((res: any) => {
      this.invoices = res;
      this.cdr.detectChanges();
    });
    return;
  }

  this.innoicesService.searchByinvoiceNumber(Number(value)).subscribe(
    (res: any) => {
      this.invoices = res;
      this.cdr.detectChanges();
    },
    (error) => console.log(error)
  );
}

}
