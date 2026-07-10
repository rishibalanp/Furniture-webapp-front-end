import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../types/product';
import { MatButtonModule } from '@angular/material/button';
import { ProductCardComponent } from '../product-card/product-card.component';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CartActions } from '../../store/cart/cart.actions';
import { selectCartProductIds } from '../../store/cart/cart.selectors';
import { WishlistActions } from '../../store/wishlist/wishlist.actions';
import { selectWishlistProductIds } from '../../store/wishlist/wishlist.selectors';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [MatButtonModule, ProductCardComponent, MatIconModule, CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  private store = inject(Store);
  private cartProductIds = new Set<string>();
  private wishlistProductIds = new Set<string>();

  similarProducts: Product[] = [];
  customerService = inject(CustomerService);
  route = inject(ActivatedRoute);
  product!: Product;
  mainImage!: string;
  constructor() {
    this.store
      .select(selectCartProductIds)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((ids) => {
        this.cartProductIds = new Set(ids);
      });

    this.store
      .select(selectWishlistProductIds)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((ids) => {
        this.wishlistProductIds = new Set(ids);
      });
  }

  ngOnInit(): void {
    this.route.params.subscribe((x: any) => {
      this.getProductDetails(x.id);
    });
  }

  getProductDetails(id: string) {
    this.customerService.getProductById(id).subscribe((result) => {
      this.product = result;
      console.log(result,'productdetailpage');
      this.mainImage = this.product.images[0];
      this.customerService
        .getSearchProduct('', this.product.categoryId, 1, 4, '', -1,'')
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
      this.store.dispatch(WishlistActions.removeWishlist({ productId: product._id! }));
    } else {
      this.store.dispatch(WishlistActions.addWishlist({ productId: product._id! }));
    }
  }

  inWishlist(product: Product) {
    return Boolean(product._id && this.wishlistProductIds.has(product._id));
  }

  addToCart(product: Product) {
    if (!this.inCart(product._id!)) {
      this.store.dispatch(CartActions.addToCart({ productId: product._id!, quantity: 1 }));
    } else {
      this.store.dispatch(CartActions.removeFromCart({ productId: product._id! }));
    }
  }
  inCart(productId: string) {
    return this.cartProductIds.has(productId);
  }
}
