import { Component, inject, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../types/product';
import { MatButtonModule } from '@angular/material/button';
import { ProductCardComponent } from '../product-card/product-card.component';
import { WishlistService } from '../../services/wishlist.service';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [MatButtonModule, ProductCardComponent, MatIconModule, CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent implements OnInit {
  wishlistService = inject(WishlistService);
  cartService = inject(CartService);

  similarProducts: Product[] = [];
  customerService = inject(CustomerService);
  route = inject(ActivatedRoute);
  product!: Product;
  mainImage!: string;
  constructor() {}

  ngOnInit(): void {
    this.route.params.subscribe((x: any) => {
      this.getProductDetails(x.id);
    });
  }

  getProductDetails(id: string) {
    this.customerService.getProductById(id).subscribe((result) => {
      this.product = result;
      this.mainImage = this.product.images[0];
      this.customerService
        .getSearchProduct('', this.product.categoryId, 1, 4, '', -1)
        .subscribe((result) => {
          this.similarProducts = result;
        });
    });
  }

  buyNow() {
    alert('Proceeding to Buy');
  }
  changeImage(url: any) {
    this.mainImage = url;
  }
  get sellingPrice() {
    return Math.floor(
      this.product?.price -
        (this.product?.price * this.product?.discount) / 100,
    );
  }
  addWishlist(product: Product) {
    if (this.inWishlist(product)) {
      this.wishlistService.removeWishlist(product._id!).subscribe((result) => {
        this.wishlistService.init();
      });
    } else {
      this.wishlistService.addWishlist(product._id!).subscribe((result) => {
        this.wishlistService.init();
      });
    }
  }

  inWishlist(product: Product) {
    let isWishlistAvailable = this.wishlistService.wishlist.find(
      (x) => x._id === product._id,
    );
    return isWishlistAvailable ? true : false;
  }

  addToCart(product: Product) {
    if (!this.inCart(product._id!)) {
      this.cartService.addToCart(product._id!, 1).subscribe(() => {
        this.cartService.init();
      });
    } else {
      this.cartService.removeFromCart(product._id!).subscribe(() => {
        this.cartService.init();
      });
    }
  }
  inCart(productId: string) {
    if (this.cartService.cartItems.find((x) => x.product._id == productId)) {
      return true;
    } else {
      return false;
    }
  }
}
