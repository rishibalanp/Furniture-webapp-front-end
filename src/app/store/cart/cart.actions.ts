import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CartItem } from '../../types/cart';

export const CartActions = createActionGroup({
  source: 'Cart',
  events: {
    'Load Cart': emptyProps(),
    'Load Cart Success': props<{ items: CartItem[] }>(),
    'Load Cart Failure': props<{ error: string }>(),
    'Add To Cart': props<{ productId: string; quantity: number }>(),
    'Add To Cart Success': emptyProps(),
    'Add To Cart Failure': props<{ error: string }>(),
    'Remove From Cart': props<{ productId: string }>(),
    'Remove From Cart Success': emptyProps(),
    'Remove From Cart Failure': props<{ error: string }>(),
    'Clear Cart State': emptyProps(),
  },
});
