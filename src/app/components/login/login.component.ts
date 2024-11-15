import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { TYPE } from './../../types/alert';
import { Router,RouterLink } from '@angular/router';
@Component({
	selector: 'app-login',
	standalone: true,
	imports: [MatButtonModule,ReactiveFormsModule,CommonModule,RouterLink],
	templateUrl: './login.component.html',
	styleUrl: './login.component.scss'
})
export class LoginComponent {
	authService = inject(AuthService);
	formBuilder = inject(FormBuilder);
  router = inject(Router)
	loginForm: FormGroup = new FormGroup({
		name: new FormControl(''),
		email: new FormControl(''),
		password: new FormControl(''),
		confirmPassword: new FormControl(''),
	});
	submitted = false;

	ngOnInit(): void {
		this.loginForm = this.formBuilder.group(
			{
				email: ['', [Validators.required, Validators.email]],
				password: [
					'',
					[
						Validators.required, 
					],
				],
			}
		);
	}

	get f(): { [key: string]: AbstractControl } {
		return this.loginForm.controls;
	}


	onSubmit(){
		this.submitted = true;

		if (this.loginForm.invalid) {
			Swal.fire({
				toast: true,
				position: 'top',
				showConfirmButton: false,
				icon: TYPE.ERROR,
				timer: 4000,
				showCloseButton:true,
				title: 'Invalid details'
			});
			return;
		}

		let value = this.loginForm.value;
		this.authService.login(value.email!,value.password!).subscribe((result:any)=>{
      if(result){
			Swal.fire({
				toast: true,
				position: 'top',
				showConfirmButton: false,
				icon: TYPE.SUCCESS,
				timer: 4000,
				showCloseButton:true,
				title: 'Logined successfully'
			});
      localStorage.setItem("token",result.token);
      localStorage.setItem("user",JSON.stringify( result.user));
      this.router.navigateByUrl("/");
      }
		})

	}
}
