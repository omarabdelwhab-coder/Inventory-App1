import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-invoices-searchnum',
  imports: [],
  templateUrl: './invoices-searchnum.html',
  styleUrl: './invoices-searchnum.css',
})
export class InvoicesSearchnum {
 @Output()searchChangenum = new EventEmitter<string>();

  private searchDebounce1:any

  onSearchInpu(value:string){
  clearTimeout(this.searchDebounce1)
  this.searchDebounce1=setTimeout(()=>{
    this.searchChangenum.emit(value)
  },400)
}
}
