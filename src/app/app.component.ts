import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { WishlistService } from './services/wishlist.service';
import { CartService } from './services/cart.service';
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
	wishlistService = inject(WishlistService);
cartService = inject(CartService);
	ngOnInit() {
		this.wishlistService.init();
		this.cartService.init();
	}
	title = 'furniture';
}
