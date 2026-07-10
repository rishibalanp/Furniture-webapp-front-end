import { createReducer, on } from '@ngrx/store';
import { CartItem } from '../../types/cart';
import { CartActions } from './cart.actions';

export const cartFeatureKey = 'cart';

export interface CartState {
  items: CartItem[];
  loading: boolean;
  error: string | null;
}

export const initialCartState: CartState = {
  items: [],
  loading: false,
  error: null,
};

export const cartReducer = createReducer(
  initialCartState,
  
  on(CartActions.loadCart, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(CartActions.loadCartSuccess, (state, { items }) => ({
    ...state,
    items,
    loading: false,
  })),
  on(CartActions.loadCartFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(CartActions.addToCart, CartActions.removeFromCart, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(CartActions.addToCartSuccess, CartActions.removeFromCartSuccess, (state) => ({
    ...state,
    loading: false,
  })),
  on(CartActions.addToCartFailure, CartActions.removeFromCartFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(CartActions.clearCartState, () => initialCartState),
);
