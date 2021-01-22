import { Component, OnInit } from '@angular/core';
import { ItemService } from './items.service';
import { Item } from './item.model';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css']
})
export class ItemsListComponent implements OnInit {

  constructor(private itemsService: ItemService) { }

  items: Array<Item>;

  ngOnInit() {
    this.items = this.itemsService.getItems();
    this.itemsService.itemsChanged.subscribe( (items:Array<Item>) => { this.items = items});
  }

}
