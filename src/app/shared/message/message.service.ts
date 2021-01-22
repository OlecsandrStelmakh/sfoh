import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  newMessage = new Subject();
  message = {
    text : '',
    style : ''
  };

  constructor() { }

  viewmessage (message:string,style:string) {
    this.message.text = message;
    this.message.style = style;
    this.newMessage.next(this.message);
    console.log(this.message)
    setTimeout(() => {
      this.newMessage.next('');
      this.message = {
        text : '',
        style : ''
      };
      console.log(this.message)
    }, 2000);
  }

  
}
