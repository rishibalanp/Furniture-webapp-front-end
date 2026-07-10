import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { Store } from '@ngrx/store';
import { CartActions } from './store/cart/cart.actions';
import { WishlistActions } from './store/wishlist/wishlist.actions';
@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet,
HeaderComponent,
FooterComponent

	],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
store = inject(Store);
	ngOnInit() {
		this.store.dispatch(CartActions.loadCart());
		this.store.dispatch(WishlistActions.loadWishlist());
	}
	title = 'furniture';
}
