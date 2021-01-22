import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemsListComponent } from './items-list/items-list.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { InfoComponent } from './info/info.component';
import { AdminComponent } from './admin/admin.component';
import { EditComponent } from './admin/edit/edit.component';
import { ItemResolverService } from './admin/edit/items-resolver.service';
import { AuthComponent } from './auth/auth.component';
import { AdminGuard } from './admin/admin.guart';
import { CartComponent } from './cart/cart.component';
import { OrderFormComponent } from './cart/order-form/order-form.component';
import { OrdersComponent } from './orders/orders.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'items', pathMatch: 'full'},
  { path: 'items', component: ItemsListComponent},
  { path: 'delivery', component: DeliveryComponent},
  { path: 'cart', component: CartComponent, resolve: [ItemResolverService], children: [
    { path: 'order-form', component: OrderFormComponent }
  ]},
  { path: 'info', component: InfoComponent},
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard], children: [
    // { path: '', component: AdminComponent },
    { path: 'new', component: EditComponent },
    { path: ':id/edit', component: EditComponent, resolve: [ItemResolverService]},
  ]},
  { path: 'orders', component: OrdersComponent, canActivate: [AdminGuard]},
  { path: 'auth', component: AuthComponent },
  { path: '**', redirectTo: 'items'},
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes,{
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
