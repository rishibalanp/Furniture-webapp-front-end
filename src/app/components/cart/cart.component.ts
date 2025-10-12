import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Product } from '../../types/product';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { Address } from '../../types/addresss';

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
  cartService = inject(CartService);
  customerService = inject(CustomerService);
  userAddress: Address[] = [];
  router = inject(Router);
  primaryAddress: Address | null = null; 
  ngOnInit() {
    this.cartService.init();
    this.customerService
    .getAddress()
    .subscribe((result: { addresses: Address[] }) => {
      this.userAddress = result.addresses;
      this.primaryAddress = this.userAddress.find(address => address.primaryAddress) || null;
    });
  }
  get cartItems() {
    return this.cartService.cartItems;
  }

  sellingPrice(product: Product) {
    return Math.round(product?.price - (product?.price * product?.discount) / 100);
  }

  addToCart(productId: string, quantity: number) {
    this.cartService.addToCart(productId, quantity).subscribe(() => {
      this.cartService.init();
    });
  }

  get totalAmount() {
    let totalAmounts = 0;
    for (let index = 0; index < this.cartItems.length; index++) {
      const element = this.cartItems[index];
      totalAmounts += this.sellingPrice(element.product) * element.quantity;
    }
    return totalAmounts;
  }
  removeCart(productId: string) {
    this.cartService.removeFromCart(productId).subscribe(() => {
      this.cartService.init();
    });
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
