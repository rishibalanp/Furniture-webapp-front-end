import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { TYPE } from './../../../types/alert';
import { SubCategoryService } from '../../../services/sub-category.service';
import { MatSelectModule } from '@angular/material/select';
import { CategoryService } from '../../../services/category.service';
import { category } from '../../../types/category';

@Component({
  selector: 'app-sub-category-form',
  standalone: true,
  imports: [
    FormsModule,
    MatInputModule,
    MatButtonModule,
    RouterLink,
    MatSelectModule,
  ],
  templateUrl: './sub-category-form.component.html',
  styleUrl: './sub-category-form.component.scss',
})
export class SubCategoryFormComponent {
  name!: string;
  subCategoryService = inject(SubCategoryService);
  categoryService = inject(CategoryService)
  router = inject(Router);
  route = inject(ActivatedRoute);
  isEdit = false;
  id!: string;
  categories: category[] = [];
  categoryId!: string;
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.isEdit = true;
      this.subCategoryService.getCategorybyid(this.id).subscribe((res: any) => {
        console.log(res);
        this.name = res.name;
        this.categoryId = res.categoryId;
      });
    }

    this.categoryService.getCategory().subscribe((categories) => {
      this.categories = categories; 
    });
  }

  addCategory() {
    if (this.name && this.categoryId) {
      this.subCategoryService.addCategory(this.name,this.categoryId).subscribe((res: any) => {
        Swal.fire({
          toast: true,
          position: 'top',
          showConfirmButton: false,
          icon: TYPE.SUCCESS,
          timer: 4000,
          showCloseButton: true,
          title: 'Added successfully',
        });
        this.router.navigateByUrl('/admin/subcategory');
      });
    } else {
      Swal.fire({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        icon: TYPE.WARNING,
        timer: 4000,
        showCloseButton: true,
        title: 'Enter category name',
      });
    }
  }
  updateCategory() {
    this.subCategoryService
      .updateCategory(this.id, this.name,this.categoryId)
      .subscribe((res: any) => {
        Swal.fire({
          toast: true,
          position: 'top',
          showConfirmButton: false,
          icon: TYPE.SUCCESS,
          timer: 4000,
          showCloseButton: true,
          title: 'Updated successfully',
        });
        this.router.navigateByUrl('/admin/subcategory');
      });
  }
}
