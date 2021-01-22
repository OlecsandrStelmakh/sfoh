import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { ItemService } from 'src/app/items-list/items.service';
import { Item } from 'src/app/items-list/item.model';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  @ViewChild ('itemForm', {static: true}) itemForm: NgForm;
  index:number = null;
  editMode:boolean = false;
  name:string;
  price:number;
  imgUrl:string;
  id:number;
  priority:number;
  description:string;
  

  constructor(private route:ActivatedRoute,
              private router:Router,
              private itemsServise: ItemService,
              private dataStorageService: DataStorageService ) { }
  

  onSubmit() {
    if(this.editMode){
      this.itemsServise.saveEditedItem(this.index,this.itemForm.value);
      this.router.navigate(['/admin']);
    } else{
      this.itemsServise.saveItem(this.itemForm.value);
    }
    this.dataStorageService.saveProducts().subscribe(request => {
      this.itemForm.reset();
      this.id = +new Date();
      }, error => { console.log (error)});
  }

  onDelete() {
    this.itemsServise.deleteItem(this.index);
    this.dataStorageService.saveProducts().subscribe();
    this.itemForm.reset();
    this.router.navigate(['/admin']);
  }

  ngOnInit() {
    this.route.params.subscribe( (params:Params) => {
      this.index = +params['id'];
      this.editMode = params['id'] != null;
      if ( params['id'] != null ) {
        const item:Item = this.itemsServise.getItem(+this.index);
        this.name = item.name;
        this.price = item.price;
        this.imgUrl = item.imgUrl;
        this.id = item.id;
        this.priority = item.priority;
        this.description = item.description;
      } else {
        this.id = +new Date();
      }
    })
  }

}
