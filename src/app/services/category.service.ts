import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { category } from '../types/category';

@Injectable({
	providedIn: 'root'
})
export class CategoryService {
	http=inject(HttpClient)
		constructor() { }

		getCategory(){
			return this.http.get<category[]>("http://localhost:3000/category");
		}

		getCategorybyid(id:string){
			return this.http.get<category>('http://localhost:3000/category/' + id);
		}

    deleteCategory(id:string){
			return this.http.delete('http://localhost:3000/category/' + id);
		}

		addCategory(name:string){
			return this.http.post("http://localhost:3000/category",{
				name:name
			});
		}
		updateCategory(id:string,name:string){
			return this.http.put('http://localhost:3000/category/' + id,{
				name:name
			});
		}
}
