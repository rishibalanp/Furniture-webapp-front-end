import { Component, inject, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../types/product';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {
  
customerService = inject(CustomerService);
  route = inject(ActivatedRoute);
  product! : Product;
  constructor() { }

  ngOnInit(): void {
    const id = this.route.snapshot.params["id"];
    this.customerService.getProductById(id).subscribe(result =>{
      this.product = result;
      console.log(this.product);
    })
  }
  addToCart() {
    alert('Added to Cart');
  }

  buyNow() {
    alert('Proceeding to Buy');
  }
}
