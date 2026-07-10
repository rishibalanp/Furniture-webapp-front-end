import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Product } from '../../types/product';

export const WishlistActions = createActionGroup({
  source: 'Wishlist',
  events: {
    'Load Wishlist': emptyProps(),
    'Load Wishlist Success': props<{ products: Product[] }>(),
    'Load Wishlist Failure': props<{ error: string }>(),
    'Add Wishlist': props<{ productId: string }>(),
    'Add Wishlist Success': emptyProps(),
    'Add Wishlist Failure': props<{ error: string }>(),
    'Remove Wishlist': props<{ productId: string }>(),
    'Remove Wishlist Success': emptyProps(),
    'Remove Wishlist Failure': props<{ error: string }>(),
    'Clear Wishlist State': emptyProps(),
  },
});
