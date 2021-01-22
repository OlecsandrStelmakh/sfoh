import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { DataStorageService } from 'src/app/shared/data-storage.service';
import { CartService } from '../cart.service';
import { MessageService } from 'src/app/shared/message/message.service';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {
  @ViewChild('f', {static: true}) clientInfo:NgForm;
  saving = false;

  constructor( private dataStorageService:DataStorageService,
               private cartService:CartService,
               private messageService:MessageService,
               private route:Router) { }

  ngOnInit() {
  }

  onSubmit(form) {
    this.saving = true;
    this.dataStorageService.addOrder({clientInfo: form.value, orderInfo: this.cartService.cart,status: "В обробці"}).subscribe(request => {
      this.saving = false;
      this.clientInfo.reset();
      this.messageService.viewmessage('Замовлення в обробці','success');
      this.cartService.clearCart();
      this.route.navigate(['items']);

      }, error => { 
        this.saving = false;
        this.messageService.viewmessage('Сталась помилка спробуйте ще раз','danger');
       });
  }

}
