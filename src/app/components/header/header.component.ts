import { Component, inject, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { category } from '../../types/category';
import { Router, RouterLink } from '@angular/router';

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
router = inject(Router)

ngOnInit(): void {
    this.categoryService.getCategory().subscribe(res =>{
	    this.categoryList = res;
    })
}

searchProduct(event:any){
  console.log(event.target.value);
  if(event.target.value){
    this.router.navigateByUrl("/product?search="+event.target.value);
  }
}

searchCategory(id:string){
  this.router.navigateByUrl("/product?categoryId="+id);
}

searchCategoryByIcon(id:string){
  this.router.navigateByUrl("/product?categoryId="+id);
}

}
