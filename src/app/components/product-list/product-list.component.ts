import { Component, inject, OnInit } from '@angular/core';
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

@Component({
	selector: 'app-product-list',
	standalone: true,
	imports: [ProductCardListComponent,MatFormFieldModule,MatSelectModule,FormsModule,MatButtonModule],
	templateUrl: './product-list.component.html',
	styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {

customerService = inject(CustomerService);
searchTerm:string = '';
categoryId:string ='';
sortBy:string = '';
sortOrder:number = -1;
page = 1;
pageSize = 10;
products: Product[]=[];
route = inject(ActivatedRoute);
id!:string;
productService = inject(ProductService);
category : category[]=[];


	ngOnInit(): void {
		this.route.queryParams.subscribe((result: any)=>{
			console.log(result,'queryparams')
			this.searchTerm = result.search || '';
			this.categoryId = result.categoryId || '';
			this.getProducts();
		});
		this.customerService.getCategory().subscribe((result:any)=>{
			this.category = result;
			console.log(this.category,'this.category')
		});
	}

	getProducts(){
		setTimeout(()=>{
			this.customerService.getSearchProduct(this.searchTerm, this.categoryId,this.page,this.pageSize,this.sortBy, this.sortOrder).subscribe(result =>{
				this.products = result;
				console.log(this.products,'this.products')
			});
		},500)
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

}
