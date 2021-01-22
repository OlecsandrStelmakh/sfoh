import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService{
  cart = {};
  cartChanged = new Subject();
  cartStatus:number = 0;
  cartStatusChanged = new Subject();

  constructor() { }

  clearCart () {
    this.cart = {}
    this.cartChanged.next(this.cart);
    this.saveCart();
    this.checkStatus();
  }

  adItemToCart(itemId: number) {
    if (!this.cart[itemId]) {
      this.cart[itemId] = 1;
    }
    this.cartChanged.next(this.cart);
    this.saveCart();
    this.checkStatus();
  }

  deleteItem(id:number) {
    delete this.cart[id]
    this.cartChanged.next(this.cart);
    this.saveCart();
    this.checkStatus();
  }

  changeCount(id:number,mode) {
    if (mode === '+') {
      this.cart[id]++;
    } else {
      if (this.cart[id] == 1) {
        this.deleteItem(id);
      } else {
        this.cart[id]--;
      }
    }
    this.cartChanged.next(this.cart);
    this.saveCart();
  }

  saveCart() {
    localStorage.setItem("cart", JSON.stringify(this.cart))
  }

  loadCart() {
    this.cart  = JSON.parse(localStorage.getItem("cart"));
    this.checkStatus();
    if (!this.cart) {
      this.cart = {};
      localStorage.setItem("cart", JSON.stringify(this.cart))
    }
  }

  checkStatus() {
    this.cartStatus = 0;
    for( let key in this.cart) {
      this.cartStatus ++;
    }
    this.cartStatusChanged.next(this.cartStatus);
  }
}