import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { Product } from '../../types/product';
import { ProductCardComponent } from '../product-card/product-card.component';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { WishlistService } from '../../services/wishlist.service';
@Component({
	selector: 'app-home',
	standalone: true,
	imports: [RouterLink,ProductCardComponent,CarouselModule,RouterLink],
	templateUrl: './home.component.html',
	styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    autoplay: true, 
    autoplayTimeout: 3000,  
    navSpeed: 700,
    navText: ['', ''],
    nav: true
  }


wishlistService = inject(WishlistService);
customerService = inject(CustomerService);
newProducts: Product[]=[];
featuredProducts: Product[]=[];
bannerImages: Product[]=[];


ngOnInit(): void {
  this.customerService.getNewProduct().subscribe(res=>{
    this.newProducts=res.slice(0, 4);;
    console.log(res,'new');
    this.bannerImages.push(...res);
    console.log(this.bannerImages,'new');
  });
  this.customerService.getFeaturedProducts().subscribe(res=>{
    this.featuredProducts=res.slice(0, 4);;
    console.log(res,'fes');
    this.bannerImages.push(...res);
    console.log(this.bannerImages,'new');
  });
  this.wishlistService.init();
}

} 
