import { ChangeDetectorRef, Component } from '@angular/core';
import { CashService } from '../../service/cash-service';
import { CashModel } from '../../models/cash-model';

@Component({
  selector: 'app-vault',
  imports: [],
  templateUrl: './vault.html',
  styleUrl: './vault.css',
})
export class Vault {
  cash!:CashModel[]
  constructor(private cashService:CashService,private cdr: ChangeDetectorRef){}
  ngOnInit(){
    this.cashService.getCash().subscribe((res:any)=>{this.cash=res
          this.cdr.detectChanges();}
)
  }
}
