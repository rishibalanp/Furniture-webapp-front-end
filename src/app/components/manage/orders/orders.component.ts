import { Component, inject, OnInit } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { Order } from '../../../types/order';
import { Product } from '../../../types/product';
import { DatePipe } from '@angular/common';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [DatePipe,MatButtonToggleModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {
  orderService = inject(OrderService);
  orders: Order[] = [];

  ngOnInit() {
    this.orderService.getAdminOrder().subscribe((result) => {
      this.orders = result;
    });
  }

  sellingPrice(product: Product) {
    return Math.round(product.price - (product.price * product.discount) / 100);
  }

  statusChanged(status:any,order:Order){
    this.orderService.updateStatus(order._id!,status.value).subscribe(result =>{
      alert("completed")
    })
  }
}
