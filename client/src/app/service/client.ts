import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Client {
  private Url_base = 'http://localhost:4000/clients';
  constructor(private http:HttpClient){}
  getAllClients(){
    return this.http.get(`${this.Url_base}`)
  }
  addNewclient(data:any){
    return this.http.post(`${this.Url_base}`,data)
  }
  updateClient(clientName:string,data:any){
    return this.http.put(`${this.Url_base}/${clientName}`,data)
  }
}
