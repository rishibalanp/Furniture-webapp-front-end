import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CustomerService } from '../../services/customer.service';
import Swal from 'sweetalert2/dist/sweetalert2.esm.all.js';
import { TYPE } from '../../types/alert';
import { Address } from '../../types/addresss';
import { Router } from '@angular/router';
import { Product } from '../../types/product';
import { Store } from '@ngrx/store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CartItem } from '../../types/cart';
import { CartActions } from '../../store/cart/cart.actions';
import { selectCartItems, selectCartTotalAmount } from '../../store/cart/cart.selectors';

@Component({
  selector: 'app-addresspage',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatButtonModule,
    MatInputModule,
  ],
  templateUrl: './addresspage.component.html',
  styleUrl: './addresspage.component.scss',
})
export class AddresspageComponent implements OnInit {
  submitted = false;
  private destroyRef = inject(DestroyRef);
  private store = inject(Store);
  customerService = inject(CustomerService);
  cartItems: CartItem[] = [];
  totalAmount = 0;
  userAddress: Address[] = [];
  router = inject(Router);
  primaryAddress: Address | null = null;
  addressFormControl: boolean = false;
  editValue: boolean = false;
  editAddressDetail: Address | null = null;

  formBuilder = inject(FormBuilder);
  addressForm = this.formBuilder.group({
    street1: ['', Validators.required],
    street2: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
    pincode: ['', Validators.required],
    phoneNumber:[,Validators.required],
    primaryAddress: [false],
  });

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

  get f(): { [key: string]: AbstractControl } {
    return this.addressForm.controls;
  }

  ngOnInit(): void {
    this.loadAddress();
    this.store.dispatch(CartActions.loadCart());
  }

  loadAddress() {
    this.customerService
      .getAddress()
      .subscribe((result: { addresses: Address[] }) => {
        this.userAddress = result.addresses;
        this.primaryAddress =
          this.userAddress.find((address) => address.primaryAddress) || null;
      });
  }

  addAddress() {
    if (this.addressForm.invalid) {
      Swal.fire({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        icon: TYPE.ERROR,
        timer: 4000,
        showCloseButton: true,
        title: 'Invalid details',
      });
      return;
    }

    const primarySelected = this.addressForm.value.primaryAddress;
    if (primarySelected) {
      this.userAddress.forEach((address) => (address.primaryAddress = false));
    }

    if (this.userAddress.length == 0) {
      this.addressForm.value.primaryAddress = true;
    }

    this.customerService
      .addAddress(this.addressForm.value)
      .subscribe((result: any) => {
        if (result.message == 200) {
          Swal.fire({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            icon: TYPE.SUCCESS,
            timer: 4000,
            showCloseButton: true,
            title: 'Address added successfully',
          });
          this.loadAddress();
          this.addressForm.reset();
          this.addressFormControl = !this.addressFormControl;
        } else {
          Swal.fire({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            icon: TYPE.WARNING,
            timer: 4000,
            showCloseButton: true,
            title: 'Something went wrong',
          });
        }
      });
  }

  UpdateAddress() {
    if (this.addressForm.invalid) {
      Swal.fire({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        icon: TYPE.ERROR,
        timer: 4000,
        showCloseButton: true,
        title: 'Invalid details',
      });
      return;
    }

    const updatedAddress = this.addressForm.value;
    const addressId = this.editAddressDetail?._id;
    this.customerService
      .updateAddress(addressId!, updatedAddress)
      .subscribe((result: any) => {
        if (result.message == 200) {
          Swal.fire({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            icon: TYPE.SUCCESS,
            timer: 4000,
            showCloseButton: true,
            title: 'Address updated successfully',
          });
          this.loadAddress();
          this.addressForm.reset();
          this.addressFormControl = !this.addressFormControl;
        } else {
          Swal.fire({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            icon: TYPE.WARNING,
            timer: 4000,
            showCloseButton: true,
            title: 'Something went wrong',
          });
        }
      });
  }

  makeprimary(address: any){
    const updatedAddress = address;
    updatedAddress.primaryAddress = true;
    const addressId = address?._id;
    this.customerService
      .updateAddress(addressId!, updatedAddress)
      .subscribe((result: any) => {
        if (result.message == 200) {
          Swal.fire({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            icon: TYPE.SUCCESS,
            timer: 4000,
            showCloseButton: true,
            title: 'Successfully added',
          });
          this.loadAddress();
        } else {
          Swal.fire({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            icon: TYPE.WARNING,
            timer: 4000,
            showCloseButton: true,
            title: 'Something went wrong',
          });
        }
      });
  }

  editAddress(address: any) {
    this.addressForm.patchValue(address);
    this.editAddressDetail = address;
    this.editValue = true;
    this.addressFormControl = true;
  }

  deleteAddress(addressId: string) {
    this.customerService.deleteAddress(addressId).subscribe((result: any) => {
      this.loadAddress();
    });
  }

  cartPage() {
    this.router.navigateByUrl('/cart');
  }

  sellingPrice(product: Product) {
    return Math.round(product.price - (product.price * product.discount) / 100);
  }

  addNewAddress() {
    this.addressForm.reset();
    this.editValue = false;
    this.addressFormControl = !this.addressFormControl;
  }
}
