import { Component, DestroyRef, inject, Input } from '@angular/core';
import { Product } from '../../types/product';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CartActions } from '../../store/cart/cart.actions';
import { selectCartProductIds } from '../../store/cart/cart.selectors';
import { WishlistActions } from '../../store/wishlist/wishlist.actions';
import { selectWishlistProductIds } from '../../store/wishlist/wishlist.selectors';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [MatButtonModule, RouterLink, MatIconModule,CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  private destroyRef = inject(DestroyRef);
  private store = inject(Store);
  private cartProductIds = new Set<string>();
  private wishlistProductIds = new Set<string>();

  @Input() product!: Product;

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

  get sellingPrice() {
    return Math.floor(
      this.product.price - (this.product.price * this.product.discount) / 100,
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
