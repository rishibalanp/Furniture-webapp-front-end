import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Order } from '../types/order';
@Injectable({
  providedIn: 'root',
})
export class OrderService {
  http = inject(HttpClient);

  constructor() {}

  placeOrder(order: Order) {
    return this.http.post(environment.apiUrl + '/customer/order', order);
  }

  getCustomerOrder(){
    return this.http.get<Order[]>(environment.apiUrl + '/customer/order');
  }
}
