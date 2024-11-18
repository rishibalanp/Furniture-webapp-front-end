import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../types/product';
import { environment } from '../../environments/environment';
import { category } from '../types/category';
import { Address } from '../types/addresss';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class CustomerService {
	router = inject(Router);
	http = inject(HttpClient);
		constructor() { }

getNewProduct(){
			return this.http.get<Product[]>(environment.apiUrl+'/customer/new-products')
}

getFeaturedProducts(){
			return this.http.get<Product[]>(environment.apiUrl+'/customer/featured-products')
}

getCategory(){
		return this.http.get<category[]>(environment.apiUrl+'/customer/categories').pipe(
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
getsubCategory(){
		return this.http.get<category[]>(environment.apiUrl+'/customer/subcategories').pipe(
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

getSearchProduct(searchTerm: string,categoryId:string,page:Number,pageSize:number, sortBy:string,sortOrder:number,subCategoryId:string){
	console.log(environment.apiUrl+`/customer/products?searchTerm=${searchTerm}&categoryId=${categoryId}&page=${page}&pageSize=${pageSize}&sortBy=${sortBy}&sortOrder=${sortOrder}`);
 return this.http.get<Product[]>(environment.apiUrl+`/customer/products?searchTerm=${searchTerm}&categoryId=${categoryId}&page=${page}&pageSize=${pageSize}&sortBy=${sortBy}&sortOrder=${sortOrder}&subCategoryId=${subCategoryId}`)
}

getProductById(id:string){
	return this.http.get<Product>(environment.apiUrl+ '/customer/product/' + id);
}


getAddress(){
	return this.http.get<{ addresses: Address[] }>(environment.apiUrl+'/customer/getaddresses');
}


addAddress(address:any){
	return this.http.post(environment.apiUrl+'/customer/addaddress',address);
}
updateAddress(addressId:string,address:any){
	return this.http.put(environment.apiUrl+'/customer/updateaddress/'+addressId,{
		address
	});
}


deleteAddress(addressId:string){
	return this.http.delete(environment.apiUrl + '/customer/removeaddress/' + addressId);
}

userDetails(){
	return this.http.get(environment.apiUrl+'/customer/userdetails');
}
}
