import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../types/product';
import { environment } from '../../environments/environment';
import { category } from '../types/category';
import { NumberSymbol } from '@angular/common';

@Injectable({
	providedIn: 'root'
})
export class CustomerService {
	http = inject(HttpClient)
		constructor() { }

getNewProduct(){
			return this.http.get<Product[]>(environment.apiUrl+'/customer/new-products')
}

getFeaturedProducts(){
			return this.http.get<Product[]>(environment.apiUrl+'/customer/featured-products')
}

getCategory(){
		return this.http.get<category[]>(environment.apiUrl+'/customer/categories')
}

getSearchProduct(searchTerm: string,categoryId:string,page:Number,pageSize:number, sortBy:string,sortOrder:number){
	console.log(environment.apiUrl+`/customer/products?searchTerm=${searchTerm}&categoryId=${categoryId}&page=${page}&pageSize=${pageSize}&sortBy=${sortBy}&sortOrder=${sortOrder}`);
 return this.http.get<Product[]>(environment.apiUrl+`/customer/products?searchTerm=${searchTerm}&categoryId=${categoryId}&page=${page}&pageSize=${pageSize}&sortBy=${sortBy}&sortOrder=${sortOrder}`)
}

getProductById(id:string){
	return this.http.get<Product>(environment.apiUrl+ '/customer/product/' + id);
}


}
