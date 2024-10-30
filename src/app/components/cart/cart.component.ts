import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Product } from '../../types/product';
import { AbstractControl, FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import Swal from 'sweetalert2';
import { TYPE } from '../../types/alert';
import {MatRadioModule} from '@angular/material/radio';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,MatButtonModule,MatInputModule,MatRadioModule,FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  cartService = inject(CartService);
  orderStep: number = 0;
  submitted = false;
  paymentType='cash'

  ngOnInit() {
    this.cartService.init();
  }
  get cartItems() {
    return this.cartService.cartItems;
  }

  sellingPrice(product: Product) {
    return Math.round(product.price - (product.price * product.discount) / 100);
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
    this.orderStep = 1;
  }

  formBuilder = inject(FormBuilder);
  addressForm = this.formBuilder.group({
    address1: ['',Validators.required],
    address2: ['',Validators.required],
    city: ['',Validators.required],
    state: ['',Validators.required],
    pincode: ['',Validators.required],
  });

  get f(): { [key: string]: AbstractControl } {
		return this.addressForm.controls;
	}

  addAddress(){
    // if (this.addressForm.invalid) {
		// 	Swal.fire({
		// 		toast: true,
		// 		position: 'top',
		// 		showConfirmButton: false,
		// 		icon: TYPE.ERROR,
		// 		timer: 4000,
		// 		showCloseButton:true,
		// 		title: 'Invalid details'
		// 	});
		// 	return;
		// }
    Swal.fire({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      icon: TYPE.SUCCESS,
      timer: 4000,
      showCloseButton:true,
      title: 'added successfully'
    });
    console.log(this.addressForm.value,'testttttt')
    this.orderStep = 2;
  }

  completeOrder(){
    let order = {
      items: this.cartItems,
      paymentType: this.paymentType,
      address: this.addressForm.value,
      date: new Date(),
      totalAmount: this.totalAmount
    };
    console.log(order,"order");
    
  }
}
