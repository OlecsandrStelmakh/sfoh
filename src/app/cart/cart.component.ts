import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service';
import { ItemService } from '../items-list/items.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  wievCart = [];
  cart
  summary:number = 0;
  constructor(private cartService: CartService,
              private itemsService: ItemService) { }
              
  OnChangeCount(id:number,mode) {
    this.cartService.changeCount(id,mode);
    this.bildCart();
  }
  OnDeleteItem(id:number) {
    this.cartService.deleteItem(id);
    this.bildCart();
  }

  bildCart() {
    this.wievCart = [];
    for( let key in this.cart) {
      this.wievCart.push({...this.itemsService.getItem(+key),...{count: this.cart[key]}})
    }
    this.summary = this.wievCart.reduce((sum,item) => { return sum + item.price*item.count} ,0);
    this.cartService.cartChanged.subscribe( cart => this.cart = cart);
  }

  ngOnInit() {
    this.cart = this.cartService.cart;
    this.cartService.cartChanged.subscribe(cart => {
      this.cart = cart
    })
    this.bildCart();
  }

}
