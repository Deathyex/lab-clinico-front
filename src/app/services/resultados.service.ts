import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { env } from './config';

@Injectable({
	providedIn: 'root',
})
export class ResultadosService {
	private http = inject(HttpClient);

	baseUrl = env.baseUrl;

	getAllResultados(): Observable<any[]> {
		return this.http.get<any[]>(`${this.baseUrl}/resultados/listAll`);
	}

	getResultadosByUserId(id: string): Observable<any[]> {
		return this.http.get<any[]>(`${this.baseUrl}/resultados/list/${id}`);
	}

	uploadResultado(
		userId: string,
		examenId: string,
		resultadoFile: File,
	): Observable<any> {
		const formData = new FormData();
		formData.append('userId', userId);
		formData.append('examenId', examenId);
		formData.append('file', resultadoFile);
		return this.http.post<any>(`${this.baseUrl}/resultados/create`, formData);
	}
}
