import { Component, OnInit, Input } from '@angular/core';
import { Item } from '../item.model';
import { CartService } from 'src/app/cart/cart.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
  host: {
    '(window:resize)': 'onResize($event)'
  }
})
export class ItemComponent implements OnInit {
  cart;
  @Input('item') item: Item;
  showItemMode = false;
  windowWidth;
  constructor( private cartService: CartService) {
  }

  onToCart(id:number) {
    this.cartService.adItemToCart(id);
  }

  onResize(event){
      this.windowWidth = event.target.innerWidth
  }

  openItem() {
    this.showItemMode= !this.showItemMode;
  }

  ngOnInit() {
    this.windowWidth = window.innerWidth;
    this.cart = this.cartService.cart;
    this.cartService.cartChanged.subscribe( cart => this.cart = cart);
  }
}
