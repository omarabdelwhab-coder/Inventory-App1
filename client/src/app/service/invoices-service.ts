import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InvoicesModel } from '../models/invoices-model';

@Injectable({
  providedIn: 'root',
})
export class InvoicesService {
  private Url_base = 'http://localhost:4000/invoices';
  constructor(private http:HttpClient){}
  getAllInvices(){
    return this.http.get(`${this.Url_base}`)
  }
  addInvoices(data:any):Observable<InvoicesModel>{
    return this.http.post<InvoicesModel>(`${this.Url_base}`,data)
  }
     getById(id:string){
      return this.http.get(`${this.Url_base}/${id}`)

   }
}
