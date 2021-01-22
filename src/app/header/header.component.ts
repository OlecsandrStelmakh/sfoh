import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  role: Boolean;
  user;
  cartStatus;

  constructor(private dataStorageService: DataStorageService,
              private authService: AuthService,
              private router: Router,
              private cart:CartService) { }

  ngOnInit() {
    this.authService.role.subscribe( status => {this.role = status} )
    this.dataStorageService.fetchProducts().subscribe();
    this.authService.user.subscribe( user => {
      this.user = user;
    }
    )
    this.cartStatus = this.cart.cartStatus;
    this.cart.cartStatusChanged.subscribe( status => {this.cartStatus = status;     console.log(status)});
  }

  onLogOut() {
    this.authService.logout();
  }

  isAdminRoute() {
    return this.router.url.match('admin') || this.router.url.match('orders')
  }


}
