import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Item } from 'src/app/items-list/item.model';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { ItemService } from 'src/app/items-list/items.service';

@Injectable({providedIn: "root"})
export  class ItemResolverService implements Resolve<Item[]> {
    constructor(private dataStorageService:DataStorageService,
                private itemsService: ItemService) {}   
    
    resolve(route:ActivatedRouteSnapshot, state:RouterStateSnapshot){
        const items = this.itemsService.getItems();
        if (items.length === 0) {
            return this.dataStorageService.fetchProducts();
        } else {
            return items;
        }
    }
}