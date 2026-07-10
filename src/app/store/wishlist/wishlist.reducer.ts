import { createReducer, on } from '@ngrx/store';
import { Product } from '../../types/product';
import { WishlistActions } from './wishlist.actions';

export const wishlistFeatureKey = 'wishlist';

export interface WishlistState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

export const initialWishlistState: WishlistState = {
  products: [],
  loading: false,
  error: null,
};

export const wishlistReducer = createReducer(
  initialWishlistState,
  on(WishlistActions.loadWishlist, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(WishlistActions.loadWishlistSuccess, (state, { products }) => ({
    ...state,
    products,
    loading: false,
  })),
  on(WishlistActions.loadWishlistFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(WishlistActions.addWishlist, WishlistActions.removeWishlist, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(WishlistActions.addWishlistSuccess, WishlistActions.removeWishlistSuccess, (state) => ({
    ...state,
    loading: false,
  })),
  on(
    WishlistActions.addWishlistFailure,
    WishlistActions.removeWishlistFailure,
    (state, { error }) => ({
      ...state,
      loading: false,
      error,
    }),
  ),
  on(WishlistActions.clearWishlistState, () => initialWishlistState),
);
