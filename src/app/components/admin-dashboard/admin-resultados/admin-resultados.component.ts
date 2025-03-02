import { Component, inject, OnInit } from '@angular/core';
import {
	FormBuilder,
	FormGroup,
	FormsModule,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { NgClass } from '@angular/common';
import { BuscadorUsuariosComponent } from '../buscador-usuarios/buscador-usuarios.component';
import { ExamenesService } from '../../../services/examenes.service';
import { ResultadosService } from '../../../services/resultados.service';

@Component({
	selector: 'app-admin-resultados',
	standalone: true,
	imports: [
		FormsModule,
		ReactiveFormsModule,
		NgClass,
		BuscadorUsuariosComponent,
	],
	templateUrl: './admin-resultados.component.html',
	styleUrl: './admin-resultados.component.css',
})
export class AdminResultadosComponent implements OnInit {
	private fb = inject(FormBuilder);
	private examenesService = inject(ExamenesService);
	private resultadosService = inject(ResultadosService);

	resultadoForm!: FormGroup;
	file: File | null = null;
	fileIsOver: boolean = false;
	userId: string = '';
	examenes: any[] = [];

	ngOnInit() {
		this.resultadoForm = this.fb.group({
			file: ['', Validators.required],
			userId: ['', Validators.required],
			examenId: ['', Validators.required],
		});
		this.examenesService.getAllExamenes().subscribe(data => {
			this.examenes = data;
		});
	}

	uploadResultado() {
		this.resultadosService
			.uploadResultado(
				this.resultadoForm.value.userId,
				this.resultadoForm.value.examenId,
				this.resultadoForm.value.file,
			)
			.subscribe(
				response => {
					console.log('Respuesta del servidor:', response);
					alert('Resultado creado correctamente');
				},
				error => {
					console.error('Error al enviar los datos:', error);
					alert('Error en la carga');
				},
			);
	}

	deleteResultado() {
		this.file = null;
		this.resultadoForm.patchValue({
			file: null,
		});

		const fileInput: HTMLInputElement =
			document.querySelector('input[type="file"]')!;
		fileInput.value = '';
	}

	onDragOver(event: DragEvent) {
		event.preventDefault();
		this.fileIsOver = true;
	}

	onDragLeave(event: DragEvent) {
		this.fileIsOver = false;
	}

	onDrop(event: DragEvent) {
		event.preventDefault();
		this.fileIsOver = false;

		const files = event.dataTransfer?.files;
		if (files && files.length > 0) {
			this.file = files[0]; // Solo tomamos el primer archivo
		}
	}

	onClick() {
		const fileInput: HTMLElement =
			document.querySelector('input[type="file"]')!;
		fileInput.click();
	}

	onFileSelected(event: Event) {
		const input = event.target as HTMLInputElement;
		const files = input.files;
		if (files && files.length > 0) {
			this.file = files[0];

			this.resultadoForm.patchValue({
				file: this.file,
			});
		}
	}

	onUserSelected(user: any): void {
		this.userId = user.id;

		this.resultadoForm.patchValue({
			userId: this.userId,
		});
	}

	enviarResultado() {
		console.log(
			'Id del examen seleccionado:',
			this.resultadoForm.value.examenId,
		);
	}
}
