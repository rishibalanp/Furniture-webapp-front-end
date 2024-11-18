import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../../services/customer.service';
import Swal from 'sweetalert2';
import { TYPE } from '../../types/alert';
import { Address } from '../../types/addresss';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  customerService = inject(CustomerService);
  userData: any;
  addresses: Address[]=[];

  ngOnInit() {
 this.loadUserData();
  }

  loadUserData(){
    this.customerService.userDetails().subscribe(result =>{
      this.userData = result;
      this.addresses = this.userData.addresses;
      console.log(this.userData,'test');
    });
  }

  deleteAddress(addressId: string) {
    this.customerService.deleteAddress(addressId).subscribe((result: any) => {
      this.loadUserData();
    });
  }

  makeprimary(address: any){
    const updatedAddress = address;
    updatedAddress.primaryAddress = true
    const addressId = address?._id;
    this.customerService
      .updateAddress(addressId!, updatedAddress)
      .subscribe((result: any) => {
        this.loadUserData();
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
}
