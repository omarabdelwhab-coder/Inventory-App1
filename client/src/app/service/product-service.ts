import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Observable } from 'rxjs'
import { ProductModel } from '../models/product-model';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private Url_base = 'http://localhost:4000/products';
  constructor(private http:HttpClient){}
  getAllPoducts(){
    return this.http.get(`${this.Url_base}`)

  }
  addProduct(data:any){
    return this.http.post(`${this.Url_base}`,data)

  }
  updateProduct(id:string,data:any){
    return this.http.put(`${this.Url_base}/id/${id}`,data)
  }
  deleteProduct(id:string){
    return this.http.delete(`${this.Url_base}/id/${id}`)
  }
  searchByName(name:string){
    return this.http.get(`${this.Url_base}/name/${name}`)
  }
  getById(id:any){
    return this.http.get(`${this.Url_base}/id/${id}`)
  }
}
