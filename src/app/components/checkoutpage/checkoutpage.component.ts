import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../../services/order.service';
import Swal from 'sweetalert2/dist/sweetalert2.esm.all.js';
import { TYPE } from '../../types/alert';
import { Order } from '../../types/order';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CartItem } from '../../types/cart';
import { CartActions } from '../../store/cart/cart.actions';
import { selectCartItems } from '../../store/cart/cart.selectors';
@Component({
  selector: 'app-checkoutpage',
  standalone: true,
  imports: [MatRadioModule,MatButtonModule,FormsModule],
  templateUrl: './checkoutpage.component.html',
  styleUrl: './checkoutpage.component.scss'
})
export class CheckoutpageComponent implements OnInit{

  private destroyRef = inject(DestroyRef);
  private store = inject(Store);
  orderService = inject(OrderService);
  router = inject(Router);
  paymentType = 'cash';
  cartItems: CartItem[] = [];

  constructor() {
    this.store
      .select(selectCartItems)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((items) => {
        this.cartItems = items;
      });
  }

  ngOnInit(): void {
    this.store.dispatch(CartActions.loadCart());
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
    //   this.store.dispatch(CartActions.loadCart());
    //   this.router.navigateByUrl('/order');
    // });
  }
}
