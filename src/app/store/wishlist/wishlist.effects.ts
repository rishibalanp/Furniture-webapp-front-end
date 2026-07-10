import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { WishlistService } from '../../services/wishlist.service';
import { WishlistActions } from './wishlist.actions';

@Injectable()
export class WishlistEffects {
  private actions$ = inject(Actions);
  private router = inject(Router);
  private wishlistService = inject(WishlistService);

  loadWishlist$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WishlistActions.loadWishlist),
      switchMap(() =>
        this.wishlistService.getWishlist().pipe(
          map((products) => WishlistActions.loadWishlistSuccess({ products })),
          catchError((error) =>
            of(WishlistActions.loadWishlistFailure({ error: this.getErrorMessage(error) })),
          ),
        ),
      ),
    ),
  );

  addWishlist$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WishlistActions.addWishlist),
      switchMap(({ productId }) =>
        this.wishlistService.addWishlist(productId).pipe(
          map(() => WishlistActions.addWishlistSuccess()),
          catchError((error) =>
            of(WishlistActions.addWishlistFailure({ error: this.getErrorMessage(error) })),
          ),
        ),
      ),
    ),
  );

  removeWishlist$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WishlistActions.removeWishlist),
      switchMap(({ productId }) =>
        this.wishlistService.removeWishlist(productId).pipe(
          map(() => WishlistActions.removeWishlistSuccess()),
          catchError((error) =>
            of(WishlistActions.removeWishlistFailure({ error: this.getErrorMessage(error) })),
          ),
        ),
      ),
    ),
  );

  reloadWishlistAfterMutation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WishlistActions.addWishlistSuccess, WishlistActions.removeWishlistSuccess),
      map(() => WishlistActions.loadWishlist()),
    ),
  );

  redirectUnauthorized$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(WishlistActions.loadWishlistFailure),
        tap(({ error }) => {
          if (error === 'Unauthorized') {
            this.router.navigate(['/login']);
          }
        }),
      ),
    { dispatch: false },
  );

  private getErrorMessage(error: unknown) {
    if (error && typeof error === 'object' && 'status' in error && error.status === 401) {
      return 'Unauthorized';
    }

    if (error && typeof error === 'object' && 'message' in error) {
      return String(error.message);
    }

    return 'Something went wrong while updating wishlist';
  }
}
