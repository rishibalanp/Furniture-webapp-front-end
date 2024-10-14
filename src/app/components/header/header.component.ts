import { Component, inject, OnInit } from '@angular/core';
import { category } from '../../types/category';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../../services/customer.service';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'app-header',
	standalone: true,
	imports: [RouterLink,CommonModule, MatMenuModule, MatIconModule, MatButtonModule,FormsModule],
	templateUrl: './header.component.html',
	styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

customerService = inject(CustomerService);
categoryList: category[]=[];
router = inject(Router);
authService = inject(AuthService);
searchTerm!:string

ngOnInit(): void {
    this.customerService.getCategory().subscribe(res =>{
	    this.categoryList = res;
    })
}

searchProduct(event:any){
  console.log(event.target.value);
  if(event.target.value){
    this.router.navigateByUrl("/product?search="+event.target.value);
  }
}

searchCategory(id:string){
  this.searchTerm = "";
  this.router.navigateByUrl("/product?categoryId="+id);
}

onProfile() {
  this.router.navigateByUrl("/profile");
}

onLogout() {
  this.authService.logout();
  this.router.navigateByUrl("/login");
}
}
