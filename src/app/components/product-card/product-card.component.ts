import { Component, inject, Input } from '@angular/core';
import { Product } from '../../types/product';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { WishlistService } from '../../services/wishlist.service';

@Component({
	selector: 'app-product-card',
	standalone: true,
	imports: [MatButtonModule,RouterLink,MatIconModule],
	templateUrl: './product-card.component.html',
	styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
	wishlistService = inject(WishlistService);
@Input() product!:Product;
get sellingPrice() {
	return Math.floor(this.product.price - (this.product.price * this.product.discount / 100));
}
addWishlist(product:Product){
	if(this.inWishlist(product)){
		this.wishlistService.removeWishlist(product._id!).subscribe((result)=>{
			this.wishlistService.init();
		});
	}else{
		this.wishlistService.addWishlist(product._id!).subscribe((result)=>{
			this.wishlistService.init();
		});
	}
}

inWishlist(product:Product){
	let isWishlistAvailable = this.wishlistService.wishlist.find(x => x._id === product._id);
	return isWishlistAvailable ? true : false;
}
}
