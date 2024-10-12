import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CategoryService } from '../../../services/category.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { TYPE } from './../../../types/alert';

@Component({
	selector: 'app-category-form',
	standalone: true,
	imports: [FormsModule,MatInputModule,MatButtonModule,RouterLink], 
	templateUrl: './category-form.component.html',
	styleUrl: './category-form.component.scss'
})
export class CategoryFormComponent implements OnInit {

	name!:string
	categoryService = inject(CategoryService);
		router = inject(Router);
		route = inject(ActivatedRoute);
			isEdit = false;
				id!:string;
		ngOnInit(): void {
			this.id = this.route.snapshot.params["id"];
				if(this.id){
					this.isEdit = true;
					this.categoryService.getCategorybyid(this.id).subscribe((res:any)=>{
					console.log(res);
          this.name = res.name
						})
					}
			}

	addCategory(){
		if(this.name){
			this.categoryService.addCategory(this.name).subscribe((res:any)=>{
				Swal.fire({
					toast: true,
					position: 'top',
					showConfirmButton: false,
					icon: TYPE.SUCCESS,
					timer: 4000,
					showCloseButton:true,
					title: 'Added successfully'
				  });
				this.router.navigateByUrl('/admin/categories');
			}) 
		}else{
			Swal.fire({
				toast: true,
				position: 'top',
				showConfirmButton: false,
				icon: TYPE.WARNING,
				timer: 4000,
				showCloseButton:true,
				title: 'Enter category name'
			  });
		}

	} 
  updateCategory(){
    this.categoryService.updateCategory(this.id,this.name).subscribe((res:any)=>{
		Swal.fire({
			toast: true,
			position: 'top',
			showConfirmButton: false,
			icon: TYPE.SUCCESS,
			timer: 4000,
			showCloseButton:true,
			title: 'Updated successfully'
		  });
      this.router.navigateByUrl('/admin/categories');
    }) 
  }
}
