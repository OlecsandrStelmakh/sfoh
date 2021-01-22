import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { CartService } from './cart/cart.service';
import { MessageService } from './shared/message/message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'sfoh';
  message;

  constructor( private authService: AuthService,
              private cartServise: CartService,
              private messageService:MessageService) {}

  ngOnInit() {
    this.authService.outoLogin();
    this.cartServise.loadCart();
    this.messageService.newMessage.subscribe( info => {this.message = !!info})

  }
}
