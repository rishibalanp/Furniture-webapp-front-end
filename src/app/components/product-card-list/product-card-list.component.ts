import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { Product } from '../../types/product';

@Component({
  selector: 'app-product-card-list',
  standalone: true,
  imports: [MatButtonModule,RouterLink],
  templateUrl: './product-card-list.component.html',
  styleUrl: './product-card-list.component.scss'
})
export class ProductCardListComponent {
  @Input() product!:Product;
}
