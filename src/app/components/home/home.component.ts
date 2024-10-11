import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { Product } from '../../types/product';

@Component({
	selector: 'app-home',
	standalone: true,
	imports: [RouterLink,MatButtonModule],
	templateUrl: './home.component.html',
	styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{


	customerService = inject(CustomerService);
newProducts: Product[]=[];
featuredProduct: Product[]=[];


ngOnInit(): void {
  this.customerService.getNewProduct().subscribe(res=>{
    this.newProducts=res;
    console.log(this.newProducts);
  })
  this.customerService.getFeaturedProducts().subscribe(res=>{
    this.featuredProduct=res;
    console.log(this.featuredProduct);
  })
}

} 
