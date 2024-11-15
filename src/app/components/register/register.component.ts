import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import Validation from './Validation';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { TYPE } from './../../types/alert';
import { Router,RouterLink } from '@angular/router';


@Component({
	selector: 'app-register',
	standalone: true,
	imports: [MatButtonModule,ReactiveFormsModule,CommonModule,RouterLink],
	templateUrl: './register.component.html',
	styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit{
	router = inject(Router);
	authService = inject(AuthService);
	formBuilder = inject(FormBuilder);
	registerForm: FormGroup = new FormGroup({
		name: new FormControl(''),
		email: new FormControl(''),
		password: new FormControl(''),
		confirmPassword: new FormControl(''),
	});
	submitted = false;

	ngOnInit(): void {
		this.registerForm = this.formBuilder.group(
			{
				name: ['', [Validators.required,Validators.maxLength(20)]],
				email: ['', [Validators.required, Validators.email]],
				password: [
					'',
					[
						Validators.required,
						Validators.minLength(6),
						Validators.maxLength(40),
					],
				],
				confirmPassword: ['', Validators.required],
			},
			{
				validators: [Validation.match('password', 'confirmPassword')],
			}
		);
	}

	get f(): { [key: string]: AbstractControl } {
		return this.registerForm.controls;
	}


	onSubmit(){
		this.submitted = true;

		if (this.registerForm.invalid) {
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

		let value = this.registerForm.value;
		this.authService.register(value.name!,value.email!,value.password!).subscribe(res=>{
			Swal.fire({
				toast: true,
				position: 'top',
				showConfirmButton: false,
				icon: TYPE.SUCCESS,
				timer: 4000,
				showCloseButton:true,
				title: 'registered successfully'
			});
			this.router.navigateByUrl('/login');
		})

	}
}
