import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { category } from '../types/category';
import { environment} from './../../environments/environment'


@Injectable({
	providedIn: 'root'
})
export class CategoryService {
	http=inject(HttpClient)
		constructor() { }

		getCategory(){
			return this.http.get<category[]>(environment.apiUrl+'/category');
		}

		getCategorybyid(id:string){
			return this.http.get<category>(environment.apiUrl+'/category/' + id);
		}

    deleteCategory(id:string){
			return this.http.delete(environment.apiUrl+'/category/' + id);
		}

		addCategory(name:string){
			return this.http.post(environment.apiUrl+'/category',{
				name:name
			});
		}
		updateCategory(id:string,name:string){
			return this.http.put(environment.apiUrl+'/category/' + id,{
				name:name
			});
		}
}
