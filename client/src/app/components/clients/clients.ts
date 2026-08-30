import { ChangeDetectorRef, Component } from '@angular/core';
import { ClientsModel } from '../../models/clients.model';
import { Client } from '../../service/client';

@Component({
  selector: 'app-clients',
  imports: [],
  templateUrl: './clients.html',
  styleUrl: './clients.css',
})
export class Clients {
  clients!:ClientsModel[]
  constructor(private clientService:Client,private cdr: ChangeDetectorRef){}
  ngOnInit(){
    this.clientService.getAllClients().subscribe((res:any)=>{
      this.clients=res
    this.cdr.detectChanges()},error=>console.log(error))

  }
}
