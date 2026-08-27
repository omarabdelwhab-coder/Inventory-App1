import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-prouduct-search',
  imports: [],
  templateUrl: './prouduct-search.html',
  styleUrl: './prouduct-search.css',
})
export class ProuductSearch {
  @Output()serchChange = new EventEmitter<string>();
  private searchDebounce:any
onSearchInput(value:string){
  clearTimeout(this.searchDebounce)
  this.searchDebounce=setTimeout(()=>{
    this.serchChange.emit(value)
  },400)
}
}
