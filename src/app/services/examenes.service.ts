import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExamenesService{

  private http = inject(HttpClient);

  getAllExamenes(): Observable<any>{
    return this.http.get<any>("http://localhost:3777/api/v1/examenes/listAll");
  }

}
