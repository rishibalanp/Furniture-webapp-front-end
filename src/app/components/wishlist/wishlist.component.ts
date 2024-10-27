import { Component, inject, OnInit } from '@angular/core';
import { WishlistService } from '../../services/wishlist.service';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Product } from '../../types/product';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit{

  wishlistService = inject(WishlistService);
  wishlist:Product[]=[];
  ngOnInit(): void {
    this.wishlistService.init();
  }
}
