import { Component, inject, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Order } from '../../types/order';
import { Product } from '../../types/product';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-customer-order',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './customer-order.component.html',
  styleUrl: './customer-order.component.scss',
})
export class CustomerOrderComponent implements OnInit {
  orderService = inject(OrderService);
  orders: Order[] = [];

  ngOnInit() {
    this.orderService.getCustomerOrder().subscribe((result) => {
      this.orders = result;
      console.log(this.orders, 'tesxxxxxx');
    });
  }

  sellingPrice(product: Product) {
    return Math.round(product.price - (product.price * product.discount) / 100);
  }
}
