import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Product } from '../../types/product';

import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { Address } from '../../types/addresss';

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
    this.router.navigateByUrl('/checkout');
  }

  goToAddressPage(){
    this.router.navigateByUrl('/address');
  }
  




}
