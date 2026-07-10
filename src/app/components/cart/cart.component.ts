import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { Product } from '../../types/product';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { Address } from '../../types/addresss';
import { Store } from '@ngrx/store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CartItem } from '../../types/cart';
import { CartActions } from '../../store/cart/cart.actions';
import { selectCartItems, selectCartTotalAmount } from '../../store/cart/cart.selectors';

declare var Razorpay: any;

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  private store = inject(Store);
  customerService = inject(CustomerService);
  cartItems: CartItem[] = [];
  totalAmount = 0;
  userAddress: Address[] = [];
  router = inject(Router);
  primaryAddress: Address | null = null; 

  constructor() {
    this.store
      .select(selectCartItems)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((items) => {
        this.cartItems = items;       
      });

    this.store
      .select(selectCartTotalAmount)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((totalAmount) => {
        this.totalAmount = totalAmount;
      });
  }

  ngOnInit() {
    this.store.dispatch(CartActions.loadCart());
    this.customerService
    .getAddress()
    .subscribe((result: { addresses: Address[] }) => {
      this.userAddress = result.addresses;
      this.primaryAddress = this.userAddress.find(address => address.primaryAddress) || null;
    });
  }

  sellingPrice(product: Product) {
    return Math.round(product?.price - (product?.price * product?.discount) / 100);
  }

  addToCart(productId: string, quantity: number) {
    this.store.dispatch(CartActions.addToCart({ productId, quantity }));
  }

  removeCart(productId: string) {
    this.store.dispatch(CartActions.removeFromCart({ productId }));
  }

  checkOut() {
    const RozarpayOptions = {
      description: 'Sample Razorpay demo',
      currency: 'INR',
      amount: 100000,
      name: 'Sai',
      key: 'rzp_test_ykpIQCXJbWgyQi',
      image: 'https://i.imgur.com/FApqk3D.jpeg',
      prefill: {
        name: 'Rishi',
        email: 'rishibalanp@gmail.com',
        phone: '8124544534'
      },
      theme: {
        color: '#531800'
      },
      modal: {
        ondismiss:  () => {
          console.log('dismissed')
        }
      }
    }

    const successCallback = (paymentid: any) => {
      console.log(paymentid);
    }

    const failureCallback = (e: any) => {
      console.log(e);
    }

    Razorpay.open(RozarpayOptions,successCallback, failureCallback)
  
  }

  goToAddressPage(){
    this.router.navigateByUrl('/address');
  }
}
