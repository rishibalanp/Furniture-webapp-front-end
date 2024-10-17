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
import { of,interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';

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
searchTerm!:string;

ngOnInit(): void {
	interval(300).pipe(
		switchMap(() => {
		  if (this.authService.isLoggedIn) {
			// Check if the user is logged in and the categoryList is empty
			if (this.categoryList.length === 0) {
			  // Make the service call to get categories
			  return this.customerService.getCategory();
			}
		  }
		  // If conditions are not met, return an empty observable
		  return of([]);
		})
	  ).subscribe(
		res => {
		  if (res && res.length > 0) {
			this.categoryList = res;
		  }
		},
		error => {
		  if (error.status === 401) {
			console.error('Unauthorized access');
		  }
		}
	  );
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
