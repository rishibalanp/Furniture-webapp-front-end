import { inject, Injectable } from '@angular/core';
import { environment} from './../../environments/environment'
import { HttpClient } from '@angular/common/http';
import { CartItem } from '../types/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
	http=inject(HttpClient)
  cartItems:CartItem[]=[];  
  constructor() { }

  init(){
    this.getCartItems().subscribe(result =>{
      this.cartItems = result;
    })
  }

  getCartItems(){
    return this.http.get<CartItem[]>(environment.apiUrl+'/customer/carts' );
  }

  addToCart(productId:string,quantity:number){
    return this.http.post(environment.apiUrl+'/customer/carts/' + productId,{
      quantity:quantity
    } );
  }
  removeFromCart(productId:string){
    return this.http.delete(environment.apiUrl+'/customer/carts/' + productId );
  }
}
