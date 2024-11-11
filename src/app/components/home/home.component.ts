import { Component, HostListener, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { Product } from '../../types/product';
import { ProductCardComponent } from '../product-card/product-card.component';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { WishlistService } from '../../services/wishlist.service';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../services/category.service';
import { category } from '../../types/category';
import { SubCategoryService } from '../../services/sub-category.service';
import { subCategory } from '../../types/subcategory';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    ProductCardComponent,
    CarouselModule,
    RouterLink,
    CommonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  categoryService = inject(CategoryService);
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    autoplay: true,
    autoplayTimeout: 3000,
    navSpeed: 700,
    navText: ['<', '>'],
    nav: true,
  };

  @HostListener('window:resize', [])
  onResize() {
    this.updateViewMode();
  }

  private updateViewMode() {
    const desktop = window.innerWidth < 900;
    if (desktop) {
      this.loadCategoriesforMobileTablet();
    } else {
      this.loadCategoriesforDesktop();
    }
  }

  categoryList: category[] = [];
  subCategoryList: any;
  wishlistService = inject(WishlistService);
  cartService = inject(CartService);
  customerService = inject(CustomerService);
  subCategoryService = inject(SubCategoryService);
  router = inject(Router);
  newProducts: Product[] = [];
  featuredProducts: Product[] = [];
  bannerImages: Product[] = [];

  ngOnInit(): void {
    this.customerService.getCategory().subscribe((result) => {
      this.categoryList = result;
    });

    this.customerService.getsubCategory().subscribe((result) => {
      this.subCategoryList = result;
    });
    this.customerService.getNewProduct().subscribe((res) => {
      this.newProducts = res.slice(0, 8);
      console.log(res, 'new');
      this.bannerImages.push(...res);
      console.log(this.bannerImages, 'new');
    });
    this.customerService.getFeaturedProducts().subscribe((res) => {
      this.featuredProducts = res.slice(0, 8);
      console.log(res, 'fes');
      this.bannerImages.push(...res);
      console.log(this.bannerImages, 'new');
    });
  }

  loadCategoriesforDesktop() {
    this.customerService.getNewProduct().subscribe((res) => {
      this.newProducts = res.slice(0, 8);
      console.log(res, 'new');
      this.bannerImages.push(...res);
      console.log(this.bannerImages, 'new');
    });
    this.customerService.getFeaturedProducts().subscribe((res) => {
      this.featuredProducts = res.slice(0, 8);
      console.log(res, 'fes');
      this.bannerImages.push(...res);
      console.log(this.bannerImages, 'new');
    });
  }

  loadCategoriesforMobileTablet(){
    this.customerService.getNewProduct().subscribe((res) => {
      this.newProducts = res.slice(0, 6);
      console.log(res, 'new');
      this.bannerImages.push(...res);
      console.log(this.bannerImages, 'new');
    });
    this.customerService.getFeaturedProducts().subscribe((res) => {
      this.featuredProducts = res.slice(0, 6);
      console.log(res, 'fes');
      this.bannerImages.push(...res);
      console.log(this.bannerImages, 'new');
    });
  }

  searchCategory(id: string) {
    this.router.navigateByUrl('/product?categoryId=' + id);
  }
  searchSubCategory(id: string) {
    this.router.navigateByUrl('/product?subCategoryId=' + id);
  }

  visibleCategory: string | null = null;
  getSubcategoriesByCategory(categoryId: string) {
    console.log(this.subCategoryList);
    return this.subCategoryList.filter(
      (subcategory: { categoryId: string }) =>
        subcategory.categoryId === categoryId,
    );
  }

  showSubcategories(categoryId: string) {
    this.visibleCategory = categoryId;
  }

  hideSubcategories() {
    this.visibleCategory = null;
  }

  keepSubcategoriesVisible() {
    this.visibleCategory = this.visibleCategory; // Keeps it visible when moving towards it
  }
}
