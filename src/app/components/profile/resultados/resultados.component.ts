import { DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ResultadosService } from '../../../services/resultados.service';

@Component({
	selector: 'app-resultados',
	standalone: true,
	imports: [DatePipe],
	templateUrl: './resultados.component.html',
	styleUrl: './resultados.component.css',
})
export class ResultadosComponent implements OnInit{
	private resultadosService = inject(ResultadosService);
	public resultados: any;

	ngOnInit(): void {
		this.resultadosService.getAllResultados().subscribe(
			(data) => {
			  this.resultados = data;
			  this.resultados[0].name = this.resultados[0].name.split('_')[1];
			  console.log(this.resultados)
			},
			(error) => {
			  console.error('Error al obtener los exámenes:', error);
			}
		  );
	}
}
