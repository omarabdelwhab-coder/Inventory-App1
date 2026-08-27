import { Component, ChangeDetectorRef } from '@angular/core';
import { ProductModel } from '../../models/product-model';
import { ProductService } from '../../service/product-service';
import { ProuductSearch } from '../prouduct-search/prouduct-search';
import { ProuductCards } from '../prouduct-cards/prouduct-cards';
import { Vault } from '../vault/vault';

@Component({
  selector: 'app-prouduct-list',
  imports: [ProuductSearch, ProuductCards,Vault],
  templateUrl: './prouduct-list.html',
  styleUrl: './prouduct-list.css',
})
export class ProuductList {

  products: ProductModel[] = [];

  constructor(
    private productService: ProductService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {

    this.productService.getAllPoducts().subscribe({

      next: (res: any) => {

        console.log('Products:', res);

        this.products = res;

        this.cdr.detectChanges();

      },

      error: (error) => {
        console.log('Products Error:', error);
      }

    });

  }

  onSearchName(name: string) {

    this.productService.searchByName(name).subscribe({

      next: (res: any) => {

        console.log('Search Result:', res);

        this.products = res;

        this.cdr.detectChanges();

      },

      error: (error) => {
        console.log(error);
      }

    });

  }

}
