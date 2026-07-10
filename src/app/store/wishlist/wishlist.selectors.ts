import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WishlistState, wishlistFeatureKey } from './wishlist.reducer';

export const selectWishlistState =
  createFeatureSelector<WishlistState>(wishlistFeatureKey);

export const selectWishlistProducts = createSelector(
  selectWishlistState,
  (state) => state.products,
);

export const selectWishlistLoading = createSelector(
  selectWishlistState,
  (state) => state.loading,
);

export const selectWishlistError = createSelector(
  selectWishlistState,
  (state) => state.error,
);

export const selectWishlistProductIds = createSelector(
  selectWishlistProducts,
  (products) => products.map((product) => product._id).filter((id): id is string => Boolean(id)),
);
