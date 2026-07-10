import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Product } from '../../types/product';
import { Store } from '@ngrx/store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { WishlistActions } from '../../store/wishlist/wishlist.actions';
import { selectWishlistProducts } from '../../store/wishlist/wishlist.selectors';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit{

  private destroyRef = inject(DestroyRef);
  private store = inject(Store);
  wishlist:Product[]=[];

  constructor() {
    this.store
      .select(selectWishlistProducts)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((products) => {
        this.wishlist = products;
      });
  }

  ngOnInit(): void {
    this.store.dispatch(WishlistActions.loadWishlist());
  }
}
