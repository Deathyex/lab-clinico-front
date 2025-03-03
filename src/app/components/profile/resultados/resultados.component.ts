import { DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ResultadosService } from '../../../services/resultados.service';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../interfaces/user';

@Component({
	selector: 'app-resultados',
	standalone: true,
	imports: [DatePipe],
	templateUrl: './resultados.component.html',
	styleUrl: './resultados.component.css',
})
export class ResultadosComponent implements OnInit {
	private resultadosService = inject(ResultadosService);
	public resultados: any = [];
	private authService = inject(AuthService);

	user: User = this.authService.checkLogin()!;

	ngOnInit(): void {
		this.resultadosService.getResultadosByUserId(this.user.id).subscribe(
			data => {
				this.resultados = data;
			},
			error => {
				console.error('Error al obtener los exámenes:', error);
			},
		);
	}

	formatName(name: string): string {
		return name.split('_')[1];
	}
}
