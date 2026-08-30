import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-invoices-search',
  imports: [],
  templateUrl: './invoices-search.html',
  styleUrl: './invoices-search.css',
})
export class InvoicesSearch {
   @Output()searchChange = new EventEmitter<string>();

  private searchDebounce:any
onSearchInput(value:string){
  clearTimeout(this.searchDebounce)
  this.searchDebounce=setTimeout(()=>{
    this.searchChange.emit(value)
  },400)
}

}
