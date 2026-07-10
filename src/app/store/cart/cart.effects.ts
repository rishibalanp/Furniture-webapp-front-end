import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { CartActions } from './cart.actions';

@Injectable()
export class CartEffects {
  private actions$ = inject(Actions);
  private cartService = inject(CartService);

  loadCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.loadCart),
      switchMap(() =>
        this.cartService.getCartItems().pipe(
          map((items) => CartActions.loadCartSuccess({ items })),
          catchError((error) =>
            of(CartActions.loadCartFailure({ error: this.getErrorMessage(error) })),
          ),
        ),
      ),
    ),
  );

  addToCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.addToCart),
      switchMap(({ productId, quantity }) =>
        this.cartService.addToCart(productId, quantity).pipe(
          map(() => CartActions.addToCartSuccess()),
          catchError((error) =>
            of(CartActions.addToCartFailure({ error: this.getErrorMessage(error) })),
          ),
        ),
      ),
    ),
  );

  removeFromCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.removeFromCart),
      switchMap(({ productId }) =>
        this.cartService.removeFromCart(productId).pipe(
          map(() => CartActions.removeFromCartSuccess()),
          catchError((error) =>
            of(CartActions.removeFromCartFailure({ error: this.getErrorMessage(error) })),
          ),
        ),
      ),
    ),
  );

  reloadCartAfterMutation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.addToCartSuccess, CartActions.removeFromCartSuccess),
      map(() => CartActions.loadCart()),
    ),
  );

  private getErrorMessage(error: unknown) {
    if (error && typeof error === 'object' && 'message' in error) {
      return String(error.message);
    }

    return 'Something went wrong while updating cart';
  }
}
