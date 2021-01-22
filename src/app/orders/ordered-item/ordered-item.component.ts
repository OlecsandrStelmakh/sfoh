import { Component, OnInit, Input } from '@angular/core';
import { ItemService } from 'src/app/items-list/items.service';

@Component({
  selector: 'app-ordered-item',
  templateUrl: './ordered-item.component.html',
  styleUrls: ['./ordered-item.component.css']
})
export class OrderedItemComponent implements OnInit {

  @Input('items') items:object;
  wievedItems = [];
  summary:number = 0;

  constructor(private itemsService: ItemService,) { }

  wievItems() {
    this.wievedItems = [];
    for( let key in this.items) {
      this.wievedItems.push({...this.itemsService.getItem(+key),...{count: this.items[key]}})
    }
    this.summary = this.wievedItems.reduce((sum,item) => { return sum + item.price*item.count} ,0);
  }

  ngOnInit() {
    this.wievItems();
  }

}
