import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';

@Component({
	selector: 'app-product-list',
	standalone: true,
	imports: [],
	templateUrl: './product-list.component.html',
	styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {


	route = inject(ActivatedRoute);
	id!:string;
  productService = inject(ProductService);


	ngOnInit(): void {
		this.id = this.route.snapshot.queryParams["categoryId"];
		console.log(this.id,'iddddddd')
	}


}
