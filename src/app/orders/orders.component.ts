import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { ItemService } from '../items-list/items.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders = {};

  constructor( private dataStorageService:DataStorageService,
              private itemServise:ItemService,) { }


  chengeStatus(id, newStatus) {
    this.dataStorageService.chengeStatus(id,newStatus).subscribe(request => {
      this.orders[id].status = newStatus;
    },
    eroor => {
    }    
    );
  }


  deleteOrder(id) {
    this.dataStorageService.deleteOrder(id).subscribe(request => {
      delete this.orders[id];
    },
    eroor => {

    }    
    );
  }

  ngOnInit() {
    this.dataStorageService.fetchOrders().subscribe(orders => { 
      this.orders = orders;
    });
  }

}
