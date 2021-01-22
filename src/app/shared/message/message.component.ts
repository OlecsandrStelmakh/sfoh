import { Component, OnInit } from '@angular/core';
import { MessageService } from './message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  message;

  constructor( private messageService:MessageService) { }

  ngOnInit() {
    this.message = this.messageService.message;
    this.messageService.newMessage.subscribe((newMessage)=>{this.message = newMessage})
  }

}
