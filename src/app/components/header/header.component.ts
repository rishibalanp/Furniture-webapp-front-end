import { Component, inject, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { category } from '../../types/category';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'app-header',
	standalone: true,
	imports: [RouterLink],
	templateUrl: './header.component.html',
	styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

categoryService = inject(CategoryService);
categoryList: category[]=[];


ngOnInit(): void {
    this.categoryService.getCategory().subscribe(res =>{
	    this.categoryList = res;
    })
}

}
