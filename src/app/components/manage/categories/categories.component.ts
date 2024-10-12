import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CategoryService } from '../../../services/category.service';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { category } from '../../../types/category';
import Swal from 'sweetalert2';
import { TYPE } from './../../../types/alert';


@Component({
	selector: 'app-categories',
	standalone: true,
	imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatButtonModule,RouterLink],
	templateUrl: './categories.component.html',
	styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements AfterViewInit,OnInit{
	displayedColumns: string[] = ['id', 'name','action'];
	dataSource: MatTableDataSource<category>;

	@ViewChild(MatPaginator) paginator!: MatPaginator;
	@ViewChild(MatSort) sort!: MatSort;

	categoryService = inject(CategoryService)

	constructor() {
		this.dataSource = new MatTableDataSource([] as any);

	}
	ngOnInit(): void {
		this.getAllCategory();
	}

	private getAllCategory() {
		this.categoryService.getCategory().subscribe((result) => {
			console.log(result);
			this.dataSource.data = result;
		});
	}

	ngAfterViewInit() {
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
	}

	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();

		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}
	edit(id:any){

	}
	delete(id:any){
this.categoryService.deleteCategory(id).subscribe((res)=>{
	Swal.fire({
		toast: true,
		position: 'top',
		showConfirmButton: false,
		icon: TYPE.SUCCESS,
		timer: 4000,
		showCloseButton:true,
		title: 'Deleted successfully'
	  });
	this.getAllCategory();
})
	}
}
