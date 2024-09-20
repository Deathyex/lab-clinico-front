import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Examen } from '../interfaces/examen';

@Injectable({
	providedIn: 'root',
})
export class ExamenesService {
	private http = inject(HttpClient);

	getAllExamenes(): Observable<Examen[]> {
		return this.http.get<Examen[]>(
			'http://localhost:3777/api/v1/examenes/listAll',
		);
	}

	getOneExamen(id: string): Observable<Examen> {
		return this.http.get<Examen>(
			`http://localhost:3777/api/v1/examenes/list/${id}`,
		);
	}

	createExamen(name: string, description: string): Observable<Examen> {
		return this.http.post<Examen>(
			'http://localhost:3777/api/v1/examenes/create',
			{ name, description },
		);
	}

	updateExamen(
		id: string,
		name: string,
		description: string,
	): Observable<Examen> {
		return this.http.patch<Examen>(
			`http://localhost:3777/api/v1/examenes/update/${id}`,
			{ name, description },
		);
	}

	deleteExamen(id: string): Observable<Examen> {
		return this.http.delete<Examen>(
			`http://localhost:3777/api/v1/examenes/delete/${id}`,
		);
	}
}
