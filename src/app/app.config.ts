import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { tokenHttpInterceptor } from './core/token-http-interceptor';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { cartFeatureKey, cartReducer } from './store/cart/cart.reducer';
import { CartEffects } from './store/cart/cart.effects';
import { wishlistFeatureKey, wishlistReducer } from './store/wishlist/wishlist.reducer';
import { WishlistEffects } from './store/wishlist/wishlist.effects';

export const appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(routes), 
		provideAnimationsAsync(),
		provideHttpClient(withInterceptors([tokenHttpInterceptor])),
		provideStore({
			[cartFeatureKey]: cartReducer,
			[wishlistFeatureKey]: wishlistReducer,
		}),
		provideEffects([CartEffects, WishlistEffects]),
		provideStoreDevtools({
			maxAge: 25,
		}),
	]
};
