import { Injectable, OnInit } from '@angular/core';
import { Item } from './item.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService implements OnInit{
  itemsChanged = new Subject()

  private items: Array<Item> = [];

  constructor() { }

  getItems () {
    if (this.items) {
      return this.items.slice()
    };
  }
  saveItems (loadedProducts) {
    this.items=loadedProducts;
  }
  getItem (id:number) {
    return this.items.find(item => item.id === id);
  }
  saveItem(item:Item)  {
    if (!this.items) {
      this.items = [item];
      this.itemsChanged.next(this.getItems());
    } else {
      this.items.push(item);
      this.itemsChanged.next(this.getItems());
    }
  }

  deleteItem(id:number) {
    let DeletedItemIdex:number ;
    this.items.find( (item, index) => {
      if (item.id == id) {
        DeletedItemIdex = index
      }
    }) 
    this.items.splice(DeletedItemIdex,1);
    this.itemsChanged.next(this.getItems());
  }
  saveEditedItem(id:number, item:Item) {
    let EditedItemIdex:number ;
    this.items.find( (item, index) => {
      if (item.id == id) {
        EditedItemIdex = index
      }
    }) 
    this.items[EditedItemIdex] = item;
    this.itemsChanged.next(this.getItems());
  }

  ngOnInit() {
  }
}
