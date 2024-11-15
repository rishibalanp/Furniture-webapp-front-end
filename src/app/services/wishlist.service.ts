import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../types/product';
import { environment } from '../../environments/environment';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  router = inject(Router);
	http = inject(HttpClient);
  wishlist: Product[]=[];

  constructor() { }

  init(){
    return this.getWishlist().subscribe((result)=>{
      this.wishlist = result;
    })
  }

  getWishlist(){
    return this.http.get<Product[]>(environment.apiUrl+ '/customer/wishlist').pipe(
			catchError((error) => {
			  if (error.status === 401) {
				this.router.navigate(['/login']);
			  } else {
				console.error('Error fetching categories:', error);
			  }
			  return throwError(() => error);
			})
		  );
  }

  addWishlist(productId: string){
    return this.http.post(environment.apiUrl+ '/customer/wishlist/' + productId,{});
  }

  removeWishlist(productId:string){
    return this.http.delete(environment.apiUrl+ '/customer/wishlist/' + productId);
  }
}
