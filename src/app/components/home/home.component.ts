import { Component, HostListener, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { Product } from '../../types/product';
import { ProductCardComponent } from '../product-card/product-card.component';
import { WishlistService } from '../../services/wishlist.service';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../services/category.service';
import { category } from '../../types/category';
import { SubCategoryService } from '../../services/sub-category.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ProductCardComponent,
    CommonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  categoryService = inject(CategoryService);
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


  images = [
    'assets/carousel/c1.png',
    'assets/carousel/c2.png',
    'assets/carousel/c3.png',
    'assets/carousel/c4.png',
    'assets/carousel/c5.png',
    'assets/carousel/c6.png',
    'assets/carousel/c7.png',
    'assets/carousel/c8.png',
    'assets/carousel/c9.png',
  ];
  currentIndex = 0;
  autoplayInterval: any;

  ngOnDestroy(): void {
    this.stopAutoplay();
  }

  startAutoplay(): void {
    this.autoplayInterval = setInterval(() => {
      this.nextSlide();
    }, 3000); // Change slide every 3 seconds
  }

  stopAutoplay(): void {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
    }
  }

  nextSlide(): void {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prevSlide(): void {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

  goToSlide(index: number): void {
    this.currentIndex = index;
  }
  ngOnInit(): void {
    this.startAutoplay();
    this.customerService.getCategory().subscribe((result:any) => {
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
