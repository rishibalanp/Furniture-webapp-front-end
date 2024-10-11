import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder,ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { category } from '../../../types/category';
import { CategoryService } from '../../../services/category.service';
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
@Component({
	selector: 'app-product-form',
	standalone: true,
	imports: [ReactiveFormsModule,MatInputModule,MatButtonModule,MatSelectModule,RouterLink],
	templateUrl: './product-form.component.html',
	styleUrl: './product-form.component.scss'
})
export class ProductFormComponent implements OnInit{

formBuilder = inject(FormBuilder);
productForm = this.formBuilder.group({
	name: [null,[Validators.required,Validators.minLength(4)] ],
	price: [null,[Validators.required]],
	discount: [],
	description: [null, [Validators.required,Validators.minLength(20)]],
	shortDescription: [null, [Validators.required,Validators.minLength(10)]],
	images: this.formBuilder.array([]),
	categoryId:[null,Validators.required]
});

categories: category[] = [];
categoryService = inject(CategoryService);
productService = inject(ProductService);
router = inject(Router);
route = inject(ActivatedRoute);
isEdit = false;
id!:string;

ngOnInit(): void {
	this.categoryService.getCategory().subscribe((categories) => {
		this.categories = categories; 
	});
	this.id = this.route.snapshot.params["id"];
	if(this.id){
		this.productService.getAllProductByID(this.id).subscribe(result =>{
			for (let index = 0; index < result.images.length; index++) {
				this.addProductImage();
			}
			this.productForm.patchValue(result as any);
		})
	}else{
		this.addProductImage();
	}
}

addProduct(){
	let value = this.productForm.value;
	console.log(this.productForm.value);
	this.productService.addProduct(value as any).subscribe(result=>{
		alert("product added successfully");
		this.router.navigateByUrl("/admin/product")
	});
}

updateProduct(){
	let value = this.productForm.value;
	this.productService.updateProduct(this.id,value as any).subscribe(result=>{
		alert("product updated successfully");
		this.router.navigateByUrl("/admin/product")
	})
}

addProductImage(){
	this.images.push(this.formBuilder.control(null));
}

removeProductImage(){
	if( this.images.length > 1){
		this.images.removeAt(this.images.length - 1);
	}
}

get images(){
	return this.productForm.get('images') as FormArray;
}
}
