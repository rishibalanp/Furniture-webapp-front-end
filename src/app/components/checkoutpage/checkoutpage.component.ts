import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../../services/order.service';
import Swal from 'sweetalert2';
import { TYPE } from '../../types/alert';
import { Order } from '../../types/order';
import { CartService } from '../../services/cart.service';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-checkoutpage',
  standalone: true,
  imports: [MatRadioModule,MatButtonModule,FormsModule],
  templateUrl: './checkoutpage.component.html',
  styleUrl: './checkoutpage.component.scss'
})
export class CheckoutpageComponent implements OnInit{

  cartService = inject(CartService);
  orderService = inject(OrderService);
  router = inject(Router);
  paymentType = 'cash';

  get cartItems() {
    return this.cartService.cartItems;
  }

  ngOnInit(): void {
    this.cartService.init();
  }
  completeOrder() {
    // let order: Order = {
    //   items: this.cartItems,
    //   paymentType: this.paymentType,
    //   address: this.addressForm.value,
    //   date: new Date(),
    // };
    // this.orderService.placeOrder(order).subscribe((result) => {
    //   Swal.fire({
    //     toast: true,
    //     position: 'top',
    //     showConfirmButton: false,
    //     icon: TYPE.SUCCESS,
    //     timer: 4000,
    //     showCloseButton: true,
    //     title: 'Orderplaced successfully',
    //   });
    //   this.cartService.init();
    //   this.router.navigateByUrl('/order');
    // });
  }
}
