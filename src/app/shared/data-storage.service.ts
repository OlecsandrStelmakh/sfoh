import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { ItemService } from '../items-list/items.service';
import { Item } from '../items-list/item.model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient,
              private itemsService: ItemService) { }

  fetchProducts() {
    return this.http.get<Item[]>('https://sfoh-00.firebaseio.com/products.json').pipe(tap(products=>{
      products.sort(function (a, b) { return b.priority - a.priority; });
      this.itemsService.saveItems(products)
      this.itemsService.itemsChanged.next(products);
      }
    ))
  }

  saveProducts() {
    let products = this.itemsService.getItems();
    return this.http.put('https://sfoh-00.firebaseio.com/products.json', products);
  }


  addOrder (orderInfo) {
    // return this.http.put('https://sfoh-00.firebaseio.com/orders/'+new Date+'products.json', orderInfo);
    return this.http.post('https://sfoh-00.firebaseio.com/orders.json', orderInfo);
  }

  chengeStatus (id,newStatus) {
    return this.http.patch('https://sfoh-00.firebaseio.com/orders/'+id+'.json', {status:newStatus});
  }

  deleteOrder(id){
    return this.http.delete('https://sfoh-00.firebaseio.com/orders/'+id+'.json');
  }

  fetchOrders() {
    return this.http.get('https://sfoh-00.firebaseio.com/orders.json').pipe(tap(orders=>{
      orders
      }
    ))
  }
}

