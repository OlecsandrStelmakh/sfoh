import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Item } from 'src/app/items-list/item.model';



@Component({
  selector: 'app-arert-item',
  templateUrl: './arert-item.component.html',
  styleUrls: ['./arert-item.component.css']
})
export class ArertItemComponent implements OnInit {

  @Input('item') item:Item; 
  @Output() closeItemAlert = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }
  
  onClose() {
    this.closeItemAlert.emit();
  }
}
