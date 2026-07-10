import { Component, DestroyRef, HostListener, inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { Product } from '../../types/product';
import { ProductCardComponent } from '../product-card/product-card.component';
import { CommonModule } from '@angular/common';
import { category } from '../../types/category';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
export class HomeComponent implements OnInit, OnDestroy {
  private destroyRef = inject(DestroyRef);
  @HostListener('window:resize', [])
  onResize() {
    this.updateViewMode();
  }

  private updateViewMode() {
    this.applyProductLimit();
  }

  categoryList: category[] = [];
  subCategoryList: any;
  customerService = inject(CustomerService);
  router = inject(Router);
  newProducts: Product[] = [];
  featuredProducts: Product[] = [];
  bannerImages: Product[] = [];
  private allNewProducts: Product[] = [];
  private allFeaturedProducts: Product[] = [];


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
    this.customerService.getCategory().pipe(takeUntilDestroyed(this.destroyRef)).subscribe((result:any) => {
      this.categoryList = result;
    });

    this.customerService.getsubCategory().pipe(takeUntilDestroyed(this.destroyRef)).subscribe((result) => {
      this.subCategoryList = result;
    });
    this.customerService.getNewProduct().pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res) => {
      this.allNewProducts = res;
      this.applyProductLimit();
    });
    this.customerService.getFeaturedProducts().pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res) => {
      this.allFeaturedProducts = res;
      this.applyProductLimit();
    });
  }

  private applyProductLimit() {
    const productLimit = window.innerWidth < 900 ? 6 : 8;
    this.newProducts = this.allNewProducts.slice(0, productLimit);
    this.featuredProducts = this.allFeaturedProducts.slice(0, productLimit);
    this.bannerImages = [...this.newProducts, ...this.featuredProducts];
  }

  searchCategory(id: string) {
    this.router.navigateByUrl('/product?categoryId=' + id);
  }
  searchSubCategory(id: string) {
    this.router.navigateByUrl('/product?subCategoryId=' + id);
  }

  visibleCategory: string | null = null;
  getSubcategoriesByCategory(categoryId: string) {
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
