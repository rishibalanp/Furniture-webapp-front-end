import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { category } from '../../types/category';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../../services/customer.service';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { of,interval,Subject } from 'rxjs';
import { switchMap, catchError, retry, takeUntil } from 'rxjs/operators';

@Component({
	selector: 'app-header',
	standalone: true,
	imports: [RouterLink,CommonModule, MatMenuModule, MatIconModule, MatButtonModule,FormsModule,MatIconModule],
	templateUrl: './header.component.html',
	styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit,OnDestroy{

private destroy$ = new Subject<void>();
customerService = inject(CustomerService);
categoryList: category[]=[];
router = inject(Router);
authService = inject(AuthService);
searchTerm!:string;

ngOnInit(): void {
	const pollingInterval = 2000; 
interval(pollingInterval).pipe(
	switchMap(() => {
	  if (this.authService.isLoggedIn) {
		if (this.categoryList.length === 0) {
		  return this.customerService.getCategory().pipe(
			retry(2), 
			catchError((error) => {
			  if (error.status === 401) {
				console.error('Unauthorized access');
				this.router.navigateByUrl('/login');
			  }
			  return of([]);
			})
		  );
		}
	  }
	  return of([]);
	}),
	takeUntil(this.destroy$) 
  ).subscribe(
	(res) => {
	  if (res && res.length > 0) {
		this.categoryList = res;
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
ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
