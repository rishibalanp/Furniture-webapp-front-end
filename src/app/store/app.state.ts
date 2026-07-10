import { CartState } from './cart/cart.reducer';
import { WishlistState } from './wishlist/wishlist.reducer';

export interface AppState {
  cart: CartState;
  wishlist: WishlistState;
}
