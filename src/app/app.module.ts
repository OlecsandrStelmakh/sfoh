import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ItemsListComponent } from './items-list/items-list.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { AppRoutingModule } from './app-routing.module';
import { InfoComponent } from './info/info.component';
import { ItemComponent } from './items-list/item/item.component';
import { AdminComponent } from './admin/admin.component';
import { EditComponent } from './admin/edit/edit.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ArertItemComponent } from './shared/arert-item/arert-item.component';
import { AuthComponent } from './auth/auth.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { AuthService } from './auth/auth.service';
import { ItemService } from './items-list/items.service';
import { AdminGuard } from './admin/admin.guart';
import { CartComponent } from './cart/cart.component';
import { FooterComponent } from './footer/footer.component';
import { OrderFormComponent } from './cart/order-form/order-form.component'
import { LoadingSpinerComponent } from './shared/loading-spiner/loading-spiner.component';
import { MessageComponent } from './shared/message/message.component';
import { OrdersComponent } from './orders/orders.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrderedItemComponent } from './orders/ordered-item/ordered-item.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ItemsListComponent,
    DeliveryComponent,
    InfoComponent,
    ItemComponent,
    AdminComponent,
    EditComponent,
    ArertItemComponent,
    AuthComponent,
    CartComponent,
    FooterComponent,
    OrderFormComponent,
    LoadingSpinerComponent,
    MessageComponent,
    OrdersComponent,
    OrderedItemComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [AdminGuard, AuthService, ItemService,  {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
