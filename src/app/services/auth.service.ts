import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	http = inject(HttpClient);
		constructor() { }

		register(name:string,email:string,password:string){
			return this.http.post(environment.apiUrl+'/auth/register',{
				name,
				email,
				password
			});
		}

		login(email:string,password:string){
			return this.http.post(environment.apiUrl+'/auth/login',{
				email,
				password
			});
		}

		get userName(){
			let userData = localStorage.getItem('user');
			if(userData){
      return JSON.parse(userData).name;
	    }
      return null;
	  }

    get isAdmin(){
			let userData = localStorage.getItem('user');
			if(userData){
        return JSON.parse(userData).isAdmin;
	    }
      return null;
	  }

    get isLoggedIn(){
			let token = localStorage.getItem('token');
			if(token){
      return true;
	    }
      return false;
	  }

    logout(){
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
}
