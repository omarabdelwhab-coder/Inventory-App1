import { Component, Input } from '@angular/core';
import { ProductModel } from '../../models/product-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prouduct-cards',
  imports: [],
  templateUrl: './prouduct-cards.html',
  styleUrl: './prouduct-cards.css',
})
export class ProuductCards {
   @Input() product!:ProductModel

  constructor(private router:Router){}

  editProduct(){
    this.router.navigate(['/product/edit/',this.product._id])
  }

}
