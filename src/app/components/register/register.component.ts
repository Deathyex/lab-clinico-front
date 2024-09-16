import { Component, OnInit } from '@angular/core';
import {
	FormBuilder,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';

@Component({
	selector: 'app-register',
	standalone: true,
	imports: [ReactiveFormsModule],
	templateUrl: './register.component.html',
	styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
	constructor(private readonly fb: FormBuilder) {}

	registerForm!: FormGroup;
	//data?:SingUp;

	ngOnInit(): void {
		this.registerForm = this.fb.group({
			id: ['', [Validators.required, Validators.minLength(10)]],
			firstName: ['', [Validators.required, Validators.minLength(3)]],
			lastName: ['', [Validators.required, Validators.minLength(3)]],
			birthDate: ['', Validators.required],
			email: ['', [Validators.required, Validators.pattern(/^.+@.+\..+$/)]],
			password: [
				'',
				[
					Validators.required,
					Validators.minLength(8),
					Validators.maxLength(250),
					Validators.pattern(/^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$/),
				],
			],
		});
	}

	register() {
		throw new Error('Method not implemented.');
	}
}
