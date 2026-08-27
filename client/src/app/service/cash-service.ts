import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CashService {
  private Url_base = 'http://localhost:4000/cash';
  constructor(private http:HttpClient){}
  getCash(){
    return this.http.get(`${this.Url_base}`)
  }

}
