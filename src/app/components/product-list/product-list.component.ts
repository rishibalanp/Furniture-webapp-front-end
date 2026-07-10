import { Component, DestroyRef, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';
import { CustomerService } from '../../services/customer.service';
import { Product } from '../../types/product';
import { ProductCardListComponent } from '../product-card-list/product-card-list.component';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { category } from '../../types/category';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
	selector: 'app-product-list',
	standalone: true,
	imports: [ProductCardListComponent,MatFormFieldModule,MatSelectModule,FormsModule,MatButtonModule],
	templateUrl: './product-list.component.html',
	styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit, OnDestroy {

customerService = inject(CustomerService);
private destroyRef = inject(DestroyRef);
private productSearchTimeout?: ReturnType<typeof setTimeout>;
searchTerm:string = '';
categoryId:string ='';
subCategoryId:string ='';
sortBy:string = '';
sortOrder:number = -1;
page = 1;
pageSize = 10;
products: Product[]=[];
route = inject(ActivatedRoute);
id!:string;
productService = inject(ProductService);
category : category[]=[];
subCategoryList:any;


	ngOnInit(): void {
		this.route.queryParams.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((result: any)=>{
			this.searchTerm = result.search || '';
			this.categoryId = result.categoryId || '';
			this.subCategoryId = result.subCategoryId || '';
			this.getProducts();
		});
		this.customerService.getCategory().pipe(takeUntilDestroyed(this.destroyRef)).subscribe((result:any)=>{
			this.category = result;
		});
		
		this.customerService.getsubCategory().pipe(takeUntilDestroyed(this.destroyRef)).subscribe((result:any) => {
			let data = result;
			this.subCategoryList = data.filter((x:any) =>  x.categoryId === this.categoryId);
		  });
	}

	getProducts(){
		this.subCategoryId ='';
		this.clearProductSearchTimeout();
		this.productSearchTimeout = setTimeout(()=>{
			this.customerService.getSearchProduct(this.searchTerm, this.categoryId,this.page,this.pageSize,this.sortBy, this.sortOrder,this.subCategoryId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(result =>{
				this.products = result;
				this.getSubcategoriesByCategory(this.categoryId);
			});
		},500);
	}

	getsubCategoryProducts(){
		this.clearProductSearchTimeout();
		this.productSearchTimeout = setTimeout(()=>{
			this.customerService.getSearchProduct(this.searchTerm, this.categoryId,this.page,this.pageSize,this.sortBy, this.sortOrder,this.subCategoryId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(result =>{
				this.products = result;
			});
		},500);
	}

	getSubcategoriesByCategory(categoryId: string) {
		this.customerService.getsubCategory().pipe(takeUntilDestroyed(this.destroyRef)).subscribe((result) => {
			let data = result;
			this.subCategoryList = data.filter((x:any) =>  x.categoryId === categoryId);
		  });
	  }
	orderChange(event:any){
		this.sortBy = 'price';
		this.sortOrder =  event;
		this.getProducts();
	}

	pageChange(page:number){
		this.page = page;
		this.getProducts();
	}

	ngOnDestroy(): void {
		this.clearProductSearchTimeout();
	}

	private clearProductSearchTimeout() {
		if (this.productSearchTimeout) {
			clearTimeout(this.productSearchTimeout);
			this.productSearchTimeout = undefined;
		}
	}

}
