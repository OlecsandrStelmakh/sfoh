import { Component, OnInit, OnDestroy } from '@angular/core';
import { ItemService } from '../items-list/items.service';
import { Item } from '../items-list/item.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnDestroy {
  items: Array<Item>;
  itemsSub: Subscription;
  constructor( private itemService: ItemService) { }

  ngOnInit() {
    this.itemsSub = this.itemService.itemsChanged.subscribe( (items:Array<Item>)=>{
      this.items = items;
    })
    this.items = this.itemService.getItems();
  }

  ngOnDestroy() {
    this.itemsSub.unsubscribe;
  }
}
