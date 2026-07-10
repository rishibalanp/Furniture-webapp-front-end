import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState, cartFeatureKey } from './cart.reducer';

export const selectCartState = createFeatureSelector<CartState>(cartFeatureKey);

export const selectCartItems = createSelector(
  selectCartState,
  (state) => state.items,
);

export const selectCartLoading = createSelector(
  selectCartState,
  (state) => state.loading,
);

export const selectCartError = createSelector(
  selectCartState,
  (state) => state.error,
);

export const selectCartProductIds = createSelector(selectCartItems, (items) =>
  items.map((item) => item.product?._id).filter((id): id is string => Boolean(id)),
);

export const selectCartTotalAmount = createSelector(selectCartItems, (items) =>
  items.reduce((total, item) => {
    const price = item.product.price - (item.product.price * item.product.discount) / 100;
    return total + Math.round(price) * item.quantity;
  }, 0),
);

export const selectCartCount = createSelector(selectCartItems, (items) =>
  items.reduce((total, item) => total + item.quantity, 0),
);
