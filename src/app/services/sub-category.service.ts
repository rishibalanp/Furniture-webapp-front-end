import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
// import { category } from '../types/category';
import {subCategory } from '../types/subcategory'
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SubCategoryService {
  http = inject(HttpClient);
  constructor() {}

  getCategory() {
    return this.http.get<subCategory[]>(environment.apiUrl + '/subcategory');
  }

  getCategorybyid(id: string) {
    return this.http.get<subCategory>(environment.apiUrl + '/subcategory/' + id);
  }

  deleteCategory(id: string) {
    return this.http.delete(environment.apiUrl + '/subcategory/' + id);
  }

  addCategory(name: string,categoryId:string) {
    return this.http.post(environment.apiUrl + '/subcategory', {
      name: name,
      categoryId:categoryId
    });
  }
  updateCategory(id: string, name: string,categoryId:string) {
    return this.http.put(environment.apiUrl + '/subcategory/' + id, {
      name: name,
      categoryId:categoryId
    });
  }
}
