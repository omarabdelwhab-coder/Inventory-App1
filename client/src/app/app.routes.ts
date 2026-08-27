import { Routes } from '@angular/router';
import { ProuductList } from './components/prouduct-list/prouduct-list';
import { ProductForm } from './components/product-form/product-form';
import { Vault } from './components/vault/vault';
import { InvoivesList } from './components/invoives-list/invoives-list';
import { InvoicesForm } from './components/invoices-form/invoices-form';
import { InvoicesDetails } from './components/invoices-details/invoices-details';

export const routes: Routes = [
  {
    path:'',
    component:ProuductList

  },
  {
    path:'product/add',
    component:ProductForm

  },
  {
    path:'product/edit/:id',
    component:ProductForm

  },
  {
    path:'vault',
    component:Vault
  },
  {
    path:'invoices',
    component:InvoivesList
  },
  {
    path:'invoicesdetails/:id',
    component:InvoicesDetails
  },
  {
    path:'addinvoice',
    component:InvoicesForm
  },



];
